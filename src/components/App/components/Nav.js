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
            className='link'
            to='/'
            style={{ color: this.props.colors.accent }}>Home</Link>
        <Link
            className='link'
            to='/photos'
            style={{ color: this.props.colors.accent }}>Photos</Link>
          <a
            href='/'
            className='link'
            id='merch_button'
            style={{
              color: this.props.colors.text,
              backgroundImage: `linear-gradient(to bottom, ${this.props.colors.main}, ${this.props.colors.accent})`,
            }}>Merch</a>
      </div>
    );
  }
}

export default Nav;
