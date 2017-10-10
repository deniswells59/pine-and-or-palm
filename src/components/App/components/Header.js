import React, { Component } from 'react';

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
          <img
            className='logo'
            src={`/assets/pandpheart_${this.props.colors.name}.png`} alt=""/>
        </div>
      </nav>
    );
  }
}

class Icon extends Component {
  render() {
    return (
      <a href={this.props.link}>
         <div className="icon-border"
           style={{
             backgroundImage: `linear-gradient(to bottom, ${this.props.colors.main}, ${this.props.colors.accent})`,
             color: this.props.colors.text
           }}>
           <i className={`icon ${this.props.icon}`}></i>
         </div>
      </a>
    )
  }
}

export default Header;
