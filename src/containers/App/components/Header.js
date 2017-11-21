import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav';
import Icon from './Icon';

class Header extends Component {
  render() {
    return (
      <nav style={{ 'backgroundColor': this.props.colors.main }}>
        <div className="social">
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
        <div className="title-wrapper">
          <Link to='/'>
            <img
              className='logo'
              src={`/assets/pandpheart_${this.props.colors.name}.png`} alt=""/>
          </Link>
        </div>

        <Nav {...this.props}/>

      </nav>
    );
  }
}

export default Header;
