import React, { Component } from 'react';

class CustomInput extends Component {
  constructor(props) {
    super(props);
  }

  renderOptions() {
    return this.props.options.map(o => {
      return <option value={o}>{o}</option>
    });
  }

  render() {
    return (
      <div className="customInput-wrapper">
        <label
          htmlFor="{ `customItem-${this.props.name}` }">
          { this.props.name }
        </label>
        <select
          id={ `customItem-${this.props.name}` }
          name={this.props.name}
          className='customInput'
          style={{
            borderColor: this.props.colors.accent
          }}>

          { this.renderOptions() }

        </select>
      </div>
    );
  }
}

export default CustomInput;
