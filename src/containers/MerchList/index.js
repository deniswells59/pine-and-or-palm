import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveMerch, fetchMerch } from '../../actions/merchActions';

import NavAnimation from '../../components/NavAnimation';

import './style.css';

class MerchList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
     this.props.merchActions.fetchMerch();
     this.props.routeChange(this.props.location);
   }

  renderData() {
    return (
      this.props.merch.map(m => {
        if(m.in_stock) {
          return (
            <div className="merch-item" key={m.id}>
              <div className="merch-img-wrapper">
                <img
                  className='merch-img'
                  src={m.images[0].src} alt=""/>
              </div>
              <div
                style={{
                  color: this.props.colors.accent
                }}
                className='merch-info'>
                <h3>{ m.name }</h3>
                <p>${ m.price }</p>
              </div>
              <div className="merch-opts">
                <Link to={`/merch-item/${m.id}`}>
                  <button
                    className='view-button'
                    style={{
                      color: this.props.colors.accent,
                      borderColor: this.props.colors.accent,
                      backgroundColor: this.props.colors.main
                    }}
                    >View</button>
                </Link>
              </div>
            </div>
          );
        }
      })
    );
  }


  render() {
    return (
      <div
        className='merch-container route-container'
        style={{ backgroundColor: this.props.colors.text }}
        >
        <div className="col">
          {this.props.merch.length > 0 ?
            this.renderData()
            :
            <div className="">
              No Data
            </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    merch: state.merch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    merchActions: bindActionCreators({ fetchMerch }, dispatch)
  };
}

export default NavAnimation(
  connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchList));
