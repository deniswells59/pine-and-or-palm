import React, { Component } from 'react';

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
      <a
        target='_blank'
        href={this.props.link}>
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


export default Icon;
