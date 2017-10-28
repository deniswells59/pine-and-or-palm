import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOne, receiveOne } from '../../actions/cartActions';


import './style.css';

class CartButton extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.cartActions.fetchCount(); // Get Item
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartCount: state.cartCount
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cartActions: bindActionCreators({ fetchCount }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartButton);
