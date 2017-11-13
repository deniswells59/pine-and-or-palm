import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

import './style.css';

class PostList extends Component {
  constructor(props) {
    super(props);

  }

  renderPosts() {
    return this.props.blog.map((p, i) => {
      return (
        <div
          key={i}
          className='blog'
          style={{color: this.props.colors.accent}}>
          <h3 >{p.title.rendered}</h3>
          { p.excerpt && p.excerpt.rendered ?
            <div
              className='excerpt-wrapper'
              style={{ color: this.props.colors.main}}
              dangerouslySetInnerHTML={{__html: p.excerpt.rendered}} ></div> :
              <div></div> }
          <div className='blog-link-wrapper'>
            <Link
              style={{ color: this.props.colors.accent }}
              to={`/blogpost/${p.id}`}>Read This</Link>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div
        className='blog-container route-container'
        style={{ backgroundColor: this.props.colors.text }}>
        <div className='blog-list'>

          { this.props.blog && this.props.blog.length ?
            this.renderPosts() :
            <Loader {...this.props} /> }

        </div>
      </div>
    );
  }
}

export default PostList;
