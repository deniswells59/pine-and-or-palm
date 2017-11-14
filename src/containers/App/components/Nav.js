import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className='nav-wrapper'>
        <div className='lrg-menu'>
          <Link
            id='photos'
            className='link'
            to='/photos'
            style={{
              color: this.props.colors.accent,
              backgroundColor: this.props.colors.text,
            }}>About</Link>
          <Link
            id='blog'
            className='link'
            to='/blog'
            style={{
              color: this.props.colors.accent,
              backgroundColor: this.props.colors.text,
            }}>Blog</Link>

          <Link
            id='photos'
            className='link'
            to='/photos'
            style={{
              color: this.props.colors.accent,
              backgroundColor: this.props.colors.text,
            }}>Photos</Link>
        </div>

        <div className='mobile-menu'>
          <i className='icon-menu'></i>
            <div className='mobile-nav'>
              <Link
                id='photos'
                className='link'
                to='/photos'
                style={{
                  color: this.props.colors.accent,
                  backgroundColor: this.props.colors.text,
                }}>About</Link>
              <Link
                id='blog'
                className='link'
                to='/blog'
                style={{
                  color: this.props.colors.accent,
                  backgroundColor: this.props.colors.text,
                }}>Blog</Link>
              <Link
                id='photos'
                className='link'
                to='/photos'
                style={{
                  color: this.props.colors.accent,
                  backgroundColor: this.props.colors.text,
                }}>Photos</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default Nav;
