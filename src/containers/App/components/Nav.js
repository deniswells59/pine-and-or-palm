import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icon from './Icon';
class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {

    return (
      <div className='nav-wrapper'>
        <div className='lrg-menu'>
          <Link
            id='photos'
            className='link'
            to='/about'
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

        <div
          className='mobile-menu'
          style={{
            right: this.state.open ? '-20vw' : '-108vw'
          }}>

          <button
            onClick={ this.toggleMenu }>
            <i
              style={{
                color: this.props.colors.text,
                backgroundColor: this.props.colors.accent
               }}
              className='icon-menu'></i>
          </button>

            <div
              className='mobile-nav'
              style={{
                color: this.props.colors.text,
                backgroundColor: this.props.colors.accent,
              }}>

              <NavLink
                {...this.props}
                clickHandler={this.toggleMenu}
                link='/photos'
                title='About'  />
              <NavLink
                {...this.props}
                clickHandler={this.toggleMenu}
                link='/blog'
                title='Blog'   />
              <NavLink
                {...this.props}
                clickHandler={this.toggleMenu}
                link='/photos'
                title='Photos' />

              <div className='social'>
                <Icon
                  {...this.props}
                  icon='icon-facebook'
                  link='google.com'/>
                <Icon
                  icon='icon-instagram'
                  link='google.com'
                  {...this.props} />
                <Icon
                  icon='icon-twitter'
                  link='google.com'
                  {...this.props} />
                <Icon
                  icon='icon-spotify'
                  link='google.com'
                  {...this.props} />
                <Icon
                  icon='icon-bandcamp'
                  link='google.com'
                  {...this.props} />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

class NavLink extends Component {
  render() {
    return(
      <Link
        onClick={ this.props.clickHandler }
        className='link'
        to={ this.props.link }
        style={{
          color: this.props.colors.text,
          backgroundColor: this.props.colors.accent,
        }}>{ this.props.title }</Link>
    )
  }
}

export default Nav;
