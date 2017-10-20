import React, { Component } from 'react';
import NavAnimation from '../NavAnimation';

import './style.css';

// {
//   "id": 0,
//   "name": 'Tie-Dyed T-Shirt',
//   "img": 'tyedyed',
//   "price": '25.50',
//   "sizes": {
//     "S": 10,
//     "M": 10,
//     "L": 5,
//     "XL": 5,
//     "XXL": 3,
//   }
// }

class Merch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      merch: []
    }
  }

  componentDidMount() {
    // Some API call
    this.props.routeChange(this.props.location);
    this.setState({ merch: require('./merch' ) }, () => console.log(this.state.merch));
  }

  render() {

    return (
      <div
        className='merch-container route-container'
        style={{ backgroundColor: this.props.colors.text }}
        >
        <div className="col">
          {this.state.merch.map(m => {
            return (
              <div className="merch-item" key={m.id}>
                <div className="merch-img-wrapper">
                  <img
                    className='merch-img'
                    src={`/assets/merch/${m.img}.png`} alt=""/>
                </div>
                <h3>{ m.name }</h3>
                <p>${ m.price }</p>
              </div>
            );
          })}

        </div>

      </div>
    );
  }
}

export default NavAnimation(Merch);
