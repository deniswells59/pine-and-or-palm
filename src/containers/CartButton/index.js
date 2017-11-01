import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCart } from '../../actions/cartActions';

import './style.css';

class CartButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartCount: 0
    };

    this.addButton = this.addButton.bind(this);
    this.renderCartCount = this.renderCartCount.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchCart(); // Get Cart
  }

  componentDidMount() {
    this.setState({ button: document.getElementById('cart') }, () => {
      setTimeout(this.addButton, 900)
    });
  }

  addButton() {
    let button = this.state.button;
    button.setAttribute('class', 'cart-button show');
    setTimeout(() => button.setAttribute('class', 'cart-button'), 1000);
  }

  renderCartCount() {
    return this.props.cart.data.items.length;
  }

  render() {
    return (
      <Link to='/cart'>
        <button
          onClick={ this.clickHandler }
          id='cart'
          className='hide'
          style={{
            backgroundColor: this.props.colors.main,
            borderColor: this.props.colors.accent,
          }}
          >
          CART - { this.props.cart && this.props.cart.data ?
            this.renderCartCount() :
            '?' }
          </button>
      </Link>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchCart }, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CartButton);
