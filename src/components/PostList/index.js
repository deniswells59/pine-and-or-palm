import React, { Component } from 'react';
import Loader from '../Loader';

import './style.css';

class PostList extends Component {
  constructor(props) {
    super(props);

  }

  renderPosts() {
    return this.props.posts.map((p, i) => {
      return (
        <div
          key={i}
          className='post'
          style={{color: this.props.colors.accent}}>
          <h3 >{p.title.rendered}</h3>
          { p.excerpt && p.excerpt.rendered ?
            <div
              className='excerpt-wrapper'
              style={{ color: this.props.colors.main}}
              dangerouslySetInnerHTML={{__html: p.excerpt.rendered}} ></div> :
              <div></div> }
        </div>
      )
    })
  }

  render() {
    return (
      <div
        className='post-container route-container'
        style={{ backgroundColor: this.props.colors.text }}>
        <div className='post-list'>

          { this.props.posts.length ?
            this.renderPosts() :
            <Loader {...this.props} /> }

        </div>
      </div>
    );
  }
}

export default PostList;
