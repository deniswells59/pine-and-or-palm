import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOnePost } from '../actions/postActions';

import Post from '../components/Post';
import NavAnimation from '../components/NavAnimation';
import Loader from '../components/Loader';


class PostContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
    this.props.postActions.fetchOnePost(this.props.match.params.id);
     this.props.routeChange(this.props.location);
   }

  render() {
    return <Post {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators({ fetchOnePost }, dispatch)
  };
}

export default NavAnimation(
  connect(
  null,
  mapDispatchToProps
)(PostContainer));
