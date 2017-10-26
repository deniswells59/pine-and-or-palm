import React, { Component } from 'react';

class ItemInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        value={ this.props.quantity }
        id="quantity"
        min='1'
        max='10'
        type='text' pattern='[0-9]*'
        onChange={ this.props.handleInput }
        style={{
          borderColor: this.props.colors.accent
        }} />
    );
  }
}

export default ItemInput;
