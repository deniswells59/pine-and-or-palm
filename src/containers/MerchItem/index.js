import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOne, receiveOne } from '../../actions/merchActions';

import NavAnimation from '../../components/NavAnimation';
import ItemInput from '../../components/ItemInput';
import CustomInput from '../../components/CustomInput';
import Loader from '../../components/Loader';

import './style.css';

class MerchItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      customAttrs: []
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentWillMount() {
    this.props.merchActions.fetchOne(this.props.match.params.id); // Get Item
    this.props.routeChange(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    this.renderCustomAttr(nextProps);
  }

  handleInput(e) {
    if(!e.target.validity.valid) return; // Check if number

    let value = parseInt(e.target.value);

    // Max of 10 because reasons
    if(value > 10) {
      value = 10;
    } else if(value < 1) {
      value = 1; // Don't allow adding 0 to cart
    }

    if(isNaN(parseFloat(value))) value = ''; // Let them backspace though

    // Don't let them add more than stock
    if(value > this.props.item.stock_quantity) value = this.props.item.stock_quantity;

    this.setState({ quantity: value });
  }

  renderCustomAttr(props) {
    let inputsToReturn = [];

    let item = props.item
    let attributes = []; // Store attr
    let lib        = {}; // Sorted attr + options

    // Create an array of all attribute name + values(option)
    if(item.variations && item.variations.length) {
      for(let i = 0; i < item.variations.length; i++) {
        let variObj = item.variations[i];
        attributes = attributes.concat(variObj.attributes);
      }
    }

    for(let i = 0; i < attributes.length; i++) {
      let attr = attributes[i];

      // Make a lib prop of not already created
      // Set it up with an options array and a key
      // i.e. attributes = [{ id: 12, name: 'size', value: 'small '}];
      if(!lib[attr.name]) {
        lib[attr.name] = {};
        lib[attr.name].options = [];
        lib[attr.name].key = i;
      }

      // Push all possible options into the lib
      // i.e. lib = {
      //  size: { options: ['small', 'medium', 'large'], id: 1 }
      // }
      if(lib[attr.name].options.indexOf(attr.option) < 0) {
        lib[attr.name].options.push(attr.option);
      }
    }

    for(let attr in lib) {
      if (lib.hasOwnProperty(attr)) {

        if(!this.state[attr]) {
          this.setState({ [attr]: lib[attr].options[0] });
        }

        inputsToReturn.push(<CustomInput
                                {...props}
                                key={lib[attr].key}
                                selected={ this.state[attr] }
                                name={attr}
                                handleChange={ this.handleChange }
                                options={lib[attr].options} />);
      }
    }

    this.setState({ customAttrs: inputsToReturn });
  }

  handleChange(e) {
    let attr = e.target.name;
    this.setState({ [attr]: e.target.value }, () => {
      this.renderCustomAttr(this.props);
    });
  }

  addToCart(e) {
    let qty = this.props.quantity;
    let attrs = Object.keys(this.state);

    attrs = attrs.filter(a => (a !== 'quantity' && a !== 'customAttrs'));
    console.log(attrs);
  }

  renderItem() {
    let item = this.props.item;
    console.log(item);

    return (
      <div className="item-container">

        <div className="item-col">
          <div className="item-img-wrapper">
            <img src={ item.images[0].src } alt=""/>
          </div>
        </div>

        <div
          className="item-col item-text"
          style={{
            color: this.props.colors.accent
          }}>

          <div className="item-info">
            <h3>{ item.name }</h3>
            <p dangerouslySetInnerHTML={{__html: item.description}}></p>
          </div>

          <div className="item-attr">

            <div className="item-input-wrapper">
              <label htmlFor="quantity">qty</label>

              <ItemInput
                handleInput={ this.handleInput }
                {...this.state}
                {...this.props}/>

            </div>


            { this.state.customAttrs }

          </div>

          <button
            onClick={ this.addToCart }
            className='merch-button'
            id="add-to-cart"
            style={{
              color: this.props.colors.accent,
              borderColor: this.props.colors.accent,
              backgroundColor: this.props.colors.main
            }}
            >Add To Cart</button>
        </div>

      </div>
    )
  }

  render() {
    return (
      <div
        className='item-container-wrapper route-container'
        style={{ backgroundColor: this.props.colors.text }}
        >
        { this.props.item.id ?
          this.renderItem()
          :
          <Loader {...this.props} />
        }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    item: state.item
  };
}

function mapDispatchToProps(dispatch) {
  return {
    merchActions: bindActionCreators({ fetchOne }, dispatch)
  };
}

export default NavAnimation(
  connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchItem));
