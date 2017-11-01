import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Cart from '../../components/Cart';

class CartButton extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    // this.props.actions.fetchCart(); // Get Cart
    this.props.routeChange(this.props.location);
  }

  render() {
    return <Cart { ...this.props } />
  }
}

function mapDispatchToProps(dispatch) {
  // return {
  //   actions: bindActionCreators({ fetchCart }, dispatch)
  // };
}

export default connect(
  null,
  mapDispatchToProps
)(CartButton);
