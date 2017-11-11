import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkoutStatus } from '../../actions/cartActions';

import NavAnimation from '../../components/NavAnimation';
import Loader from '../../components/Loader';

// import './style.css';

class SuccessContainer extends Component {

  componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
     this.props.cartActions.checkoutStatus();
     this.props.routeChange(this.props.location);
  }

  render() {
    return (
      <div
        className='success-container route-container'
        style={{ backgroundColor: this.props.colors.text }}
        >

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cartActions: bindActionCreators({ checkoutStatus }, dispatch)
  };
}

export default NavAnimation(
  connect(
  null,
  mapDispatchToProps
)(SuccessContainer));
