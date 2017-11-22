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
            link='https://www.facebook.com/pinenpalm/'/>
          <Icon
            icon='icon-instagram'
            link='https://www.instagram.com/pineandorpalm/'
            {...this.props} />
          <Icon
            icon='icon-twitter'
            link='https://twitter.com/pineandorpalm'
            {...this.props} />
          <Icon
            icon='icon-spotify'
            link='https://open.spotify.com/artist/6pCTQXENqMVBhAX4ar3n8j'
            {...this.props} />
          <Icon
            icon='icon-bandcamp'
            link='https://pineandpalm.bandcamp.com/'
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
