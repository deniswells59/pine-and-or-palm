import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOne, receiveOne } from '../../actions/merchActions';

import NavAnimation from '../../components/NavAnimation';
import ItemInput from '../../components/ItemInput';
import CustomInput from '../../components/CustomInput';

import './style.css';

class MerchItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    }

    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    this.props.merchActions.fetchOne(this.props.match.params.id); // Get Item
    this.props.routeChange(this.props.location);
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

  renderCustomAttr() {
    let inputsToReturn = [];

    let item       = this.props.item;
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
      // Set it up with an array
      // i.e. attributes = [{ id: 12, name: 'size', value: 'small '}];
      if(!lib[attr.name]) {
        lib[attr.name] = [];
      }

      // Push all possible options into the lib
      // i.e. lib = {
      //  size: ['small', 'medium', 'large'];
      // }
      if(lib[attr.name].indexOf(attr.option) < 0) {
        lib[attr.name].push(attr.option);
      }
    }

    for(let attr in lib) {
      if (lib.hasOwnProperty(attr)) {
        inputsToReturn.push(<div className="item-input-wrapper">
                                <CustomInput
                                    {...this.props}
                                    name={attr}
                                    options={lib[attr]} /></div>);
      }
    }

    return inputsToReturn;
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


            { this.renderCustomAttr() }

          </div>
        </div>

      </div>
    )
  }

  render() {
    return (
      <div
        className='merch-container route-container'
        style={{ backgroundColor: this.props.colors.text }}
        >
        { this.props.item.id ?
          this.renderItem()
          :
          <div>
            No Data
          </div>
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
