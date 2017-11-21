import React, { Component } from 'react';

import Loader from '../Loader';

import './style.css';

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.routeChange(this.props.location);
  }

  renderAbout() {
    let { about } = this.props.wp;

    return (
      <div className='about-content post-content-container'>
        <div
          dangerouslySetInnerHTML={{__html: about.content.rendered}}></div>
      </div>
    )
  }

  render() {
    let { about } = this.props.wp;

    return (
      <div
        className='about-container route-container'
        style={{ backgroundColor: this.props.colors.text }}
        >
        <h2
          style={{
            color: this.props.colors.main
          }}
          className='about-title'>Pine + Palm</h2>
        { about ?
          this.renderAbout() :
          <Loader {...this.props} />
        }
      </div>
    );
  }
}

export default About;
