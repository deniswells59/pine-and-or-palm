import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Route Components
import Home from '../../components/Home';
import Photos from '../../components/Photos';

// Route Containers
// import MerchList from '../MerchList';
// import MerchItem from '../MerchItem';
// import CartContainer from '../CartContainer';
// import SuccessContainer from '../SuccessContainer';
import BlogListContainer from '../BlogListContainer';
import PostContainer from '../PostContainer';

// Fixed Buttons
import TripButton from '../../components/Photos/components/TripButton';
// import CartButton from '../CartButton';

// Misc
import Loader from '../../components/Loader';
import Header from './components/Header.js';
import RouteContainer from './components/RouteContainer.js';
import AudioPlayer from './components/AudioPlayer.js';

// Actions
import { fetchSession } from '../../actions/cartActions';
import { fetchHome } from '../../actions/wpActions';

// Style
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip: false,
      photos: false,
      merch: false,
      colors: { main: '#490278',text: '#140152', accent:'#950595', name:'purp' },
      listIndex: 0,
      list: [
        { main: '#490278',text: '#140152', accent: '#780278', name: 'purp' },
        { main: '#5CDB95',text: '#05386B', accent: '#EDF5E1', name: 'green' },
        { main: '#F24D16',text: '#FBEEC1', accent: '#4CD4B0', name: 'retro' },
      ]
    }

    this.trip = this.trip.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.routeChange = this.routeChange.bind(this);
    this.removeButtons = this.removeButtons.bind(this);
    this.renderRoutes = this.renderRoutes.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchHome();
  }

  componentDidMount() {
    this.state.interval = setInterval(this.changeColor, 15000);
    this.props.actions.fetchSession()
    setTimeout(function(){
        // This hides the address bar maybw probably not:
        document.querySelector('body').scrollTo(0, 1);
    }, 0);
  }

  changeColor() {
    let index = this.state.listIndex + 1;
    if(index > this.state.list.length - 1) index = 0;

    this.setState({
      colors: this.state.list[index],
      listIndex: index,
    })
  }

  routeChange(location) {
    this.removeButtons();
    let url = location.pathname.split('/')[1];

    switch (url) {
      case 'photos':
        this.setState({ photos: true });
        break;
      case 'merch':
      case 'merch-item':
        this.setState({ merch: true });
        break;
      default:
        this.removeButtons();
    }
  }

  removeButtons() {
    this.setState({ photos: false, merch: false });
  }

  trip() {
    this.setState({ trip: !this.state.trip });
  }

  renderRoutes() {
    if(this.props.session) {
      let tripButton = <div></div>;
      let cartButton = <div></div>;

      if(this.state.photos) {
        tripButton = <TripButton
                        clickHandler={ this.trip }
                        className={ this.state.tripButton }
                        {...this.props}
                        {...this.state} />;
      }


      if(this.state.merch) {
        cartButton = <CartButton
                        {...this.props}
                        {...this.state} />;
      }

      return (
        <div>
          <Route
            exact
            path="/"
            children={({ match, ...rest }) => (
              <RouteContainer>
                {match && <Home
                  routeChange={ this.routeChange }
                  {...this.state}
                  {...this.props}
                  {...rest} />}
                </RouteContainer>
              )}/>

          <Route
            path='/photos'
            children={ ({ match, ...rest }) => (
              <div>

                { tripButton }

                <RouteContainer>
                  {match && <Photos
                    routeChange={ this.routeChange }
                    {...this.state}
                    {...this.props}
                    {...rest} />}
                  </RouteContainer>
                </div>
              )} />

          <Route
            path='/blog'
            children={ ({ match, ...rest }) => (
              <div>

                <RouteContainer>
                  {match && <BlogListContainer
                    routeChange={ this.routeChange }
                    {...this.state}
                    {...this.props}
                    {...rest} />}
                  </RouteContainer>
                </div>
              )} />

          <Route
            path='/blogpost/:id'
            children={ ({ match, ...rest }) => (
              <div>

                <RouteContainer>
                  {match && <PostContainer
                    match={ match }
                    routeChange={ this.routeChange }
                    {...this.state}
                    {...this.props}
                    {...rest} />}
                  </RouteContainer>
                </div>
              )} />


      </div>
      )
    } else {
      return <Loader {...this.state} />
    }
  }

  render() {
    return (
      <div>

        <BrowserRouter>
          <div className='container'>

            <Header {...this.state} />

            <div className="body-wrapper">

              { this.renderRoutes() }

            </div>

          </div>
        </BrowserRouter>

        <AudioPlayer {...this.state} />

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cart,
    session: state.session,
    merch: state.merch,
    item: state.item,
    blog: state.blog,
    post: state.post,
    wp:   state.wp,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchSession, fetchHome }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// <Route
//   path='/merch'
//   children={ ({ match, ...rest }) => (
//     <div>
//
//       { cartButton }
//
//       <RouteContainer>
//         {match && <MerchList
//           routeChange={ this.routeChange }
//           {...this.state}
//           {...this.props}
//           {...rest} />}
//         </RouteContainer>
//       </div>
//     )} />
//
// <Route
//   path='/merch-item/:id'
//   children={ ({ match, ...rest }) => (
//     <div>
//
//       { cartButton }
//
//       <RouteContainer>
//         {match && <MerchItem
//           match={ match }
//           routeChange={ this.routeChange }
//           {...this.state}
//           {...this.props}
//           {...rest} />}
//         </RouteContainer>
//       </div>
// )} />
//
// <Route
//   path='/cart'
//   children={ ({ match, ...rest }) => (
//     <div>
//
//       { cartButton }
//
//       <RouteContainer>
//         {match && <CartContainer
//                     match={ match }
//                     routeChange={ this.routeChange }
//                     {...this.state}
//                     {...this.props}
//                     {...rest} />}
//         </RouteContainer>
//       </div>
// )} />
// <Route
//   path='/success'
//   children={ ({ match, ...rest }) => (
//     <div>
//       <RouteContainer>
//         {match && <SuccessContainer
//                     match={ match }
//                     routeChange={ this.routeChange }
//                     {...this.state}
//                     {...this.props}
//                     {...rest} />}
//         </RouteContainer>
//       </div>
// )} />
