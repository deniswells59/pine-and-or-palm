import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAbout } from '../actions/wpActions';

import NavAnimation from '../components/NavAnimation';
import About        from '../components/About';

class AboutContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
    this.props.aboutAction.fetchAbout();
   }

  render() {
    return <About {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    aboutAction: bindActionCreators({ fetchAbout }, dispatch)
  };
}

export default NavAnimation(
  connect(
  null,
  mapDispatchToProps
)(AboutContainer));
