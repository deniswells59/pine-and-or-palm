import React, { Component } from 'react';

class CustomInput extends Component {
  constructor(props) {
    super(props);
  }

  renderOptions() {
    return this.props.options.map((o, i) => {
      return (<option
                key={i}
                value={o}>{o}</option>);
    });
  }

  render() {
    return (
      <div
        className="item-input-wrapper">
        <div
          className="customInput-wrapper">
          <label
            htmlFor="{ `customItem-${this.props.name}` }">
            { this.props.name }
          </label>
          <select
            id={ `customItem-${this.props.name}` }
            name={this.props.name}
            className='customInput'
            onChange={ this.props.handleChange }
            value={ this.props.selected }
            style={{
              borderColor: this.props.colors.accent
            }}>

            { this.renderOptions() }

          </select>
        </div>
      </div>
    );
  }
}

export default CustomInput;
