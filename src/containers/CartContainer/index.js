import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCart, sendCheckout } from '../../actions/cartActions';
import { fetchMerch } from '../../actions/merchActions';

import Cart from '../../components/Cart';
import NavAnimation from '../../components/NavAnimation';

class CartContainer extends Component {
  constructor(props) {
    super(props);

    this.checkout = this.checkout.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchCart(); // Get Cart
    this.props.actions.fetchMerch(); // Get Cart
    this.props.routeChange(this.props.location);
  }

  checkout() {
    this.props.actions.sendCheckout(this.props.cart.data);
  }

  render() {
    return <Cart
            clickHandler={ this.checkout }
            { ...this.props } />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchCart, sendCheckout, fetchMerch }, dispatch)
  };
}

export default NavAnimation(
  connect(
  null,
  mapDispatchToProps
)(CartContainer));
