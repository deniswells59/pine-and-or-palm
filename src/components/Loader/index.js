import React, { Component } from 'react';

import './style.css';

class Loader extends Component {

  renderList() {
    let lis = [];

    for(let i = 0; i < 6; i++) {
      lis.push(<li
                  key={i}
                  style={{
                    backgroundColor: this.props.colors.accent
                  }}></li>);
    }

    return lis;
  }

  render() {
    return (
      <div
        id={this.props.relative ? 'relative' : ''}
        className="loader-wrapper">
        <div
          id='loader'>
          <ul>
            { this.renderList() }
          </ul>
        </div>
      </div>
    );
  }
}

export default Loader;
