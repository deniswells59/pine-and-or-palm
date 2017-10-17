import React, { Component } from 'react';
import Nav from './Nav';

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

        <Nav {...this.props}/>

      </nav>
    );
  }
}

class Icon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }

    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    let color = this.props.colors.text;

    if(this.state.hover) {
      color = '#fcfcfc';
    }

    return (
      <a href={this.props.link}>
         <div
           onMouseEnter={this.toggleHover}
           onMouseLeave={this.toggleHover}
           className="icon-border"
           style={{
             backgroundImage: `linear-gradient(to bottom, ${this.props.colors.main}, ${this.props.colors.accent})`,
             color
           }}>
           <i className={`icon ${this.props.icon}`}></i>
         </div>
      </a>
    )
  }
}

export default Header;
