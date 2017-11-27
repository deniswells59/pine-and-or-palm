import React, { Component } from 'react';
import Loader from '../Loader';

import './style.css';

class Post extends Component {
  constructor(props) {
    super(props);

  }

  renderPost() {
    let { post } = this.props;
    return (
      <div>
        <h2
          style={{ color: this.props.colors.accent }}>{ post.title.rendered }</h2>
        <p
          dangerouslySetInnerHTML={{__html: post.content.rendered}}></p>
      </div>
    );
  }

  render() {
    return (
      <div
        className='post-container'
        style={ { backgroundColor: this.props.colors.text } }>
        <div className='post-content-container'>
          { this.props.post && this.props.post.title ?
            this.renderPost() :
            <Loader { ...this.props } />
          }
        </div>
      </div>
    );
  }
}

export default Post;
