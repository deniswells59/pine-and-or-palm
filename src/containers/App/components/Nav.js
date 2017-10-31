import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className='nav-wrapper'>
        <Link
            id='home'
            className='link'
            to='/'
            style={{
              color: this.props.colors.accent,
              backgroundColor: this.props.colors.text,
            }}>Home</Link>
        <Link
            id='photos'
            className='link'
            to='/photos'
            style={{
              color: this.props.colors.accent,
              backgroundColor: this.props.colors.text,
            }}>Photos</Link>
        <Link
            id='merch'
            className='link'
            to='/merch'
            style={{
              color: this.props.colors.accent,
              backgroundColor: this.props.colors.text,
            }}>Merch</Link>

      </div>
    );
  }
}

export default Nav;
