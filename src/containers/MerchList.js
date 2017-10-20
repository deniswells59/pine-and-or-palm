import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as merchActions from '../actions/merchActions';

import React, { Component } from 'react';

class MerchList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
     this.props.merchActions.fetchMerch();
   }

  renderData() {
    return (
      this.props.merch.map(m => {
        return (
          <div className="merch-item" key={m.id}>
            <div className="merch-img-wrapper">
              <img
                className='merch-img'
                src={`/assets/merch/${m.img}.png`} alt=""/>
            </div>
            <h3>{ m.name }</h3>
            <p>${ m.price }</p>
          </div>
        );
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
    merchActions: bindActionCreators(merchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchList);
