import React, { Component } from 'react';

import Loader from '../Loader';
import './style.css';

class Cart extends Component {

  renderCart() {
    let { cart, merch } = this.props;
    if(cart.data.items.length < 1) {
      return (
        <p
          style={ {color: this.props.colors.main} }
        >No Items in Cart.</p>
      );
    };

    let cartDivs = cart.data.items.map(c => {
      return (
        <div className="cart-item" key={c.id}>

        </div>
      );
    });

    cartDivs.push(this.checkoutButton());
    return cartDivs;
  }

  checkoutButton() {
    return (
      <button
        key='-1'
        onClick={ this.props.clickHandler }
        >Checkout
      </button>
    );
  }

  render() {
    return (
      <div
        className='cart-wrapper'
        style={ {
          backgroundColor: this.props.colors.text
        } }
        >
        <div className="col">
          <div className="cart">

            { this.props.cart && this.props.cart.data &&
                this.props.cart.data.items ?
                this.renderCart() :
                <Loader {...this.props} />  }

          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
