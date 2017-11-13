import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receivePosts, fetchPosts } from '../actions/postActions';

import PostList from '../components/PostList';
import NavAnimation from '../components/NavAnimation';

// import './style.css';

class BlogListContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
     this.props.postActions.fetchPosts();
     this.props.routeChange(this.props.location);
   }

  render() {
    return <PostList {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators({ fetchPosts }, dispatch)
  };
}

export default NavAnimation(
  connect(
  null,
  mapDispatchToProps
)(BlogListContainer));
