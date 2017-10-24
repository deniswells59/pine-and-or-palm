import React, { Component } from 'react';
import NavAnimation from '../../components/NavAnimation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOne, receiveOne } from '../../actions/merchActions';

import './style.css';

class MerchItem extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.merchActions.fetchOne(this.props.match.params.id);
    this.props.routeChange(this.props.location);
  }

  render() {
    let item = this.props.item;

    return (
      <div
        className='merch-container route-container'
        style={{ backgroundColor: this.props.colors.text }}
        >

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
