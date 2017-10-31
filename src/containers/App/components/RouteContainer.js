import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

class RouteContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <TransitionGroup component={firstChild}>
          { this.props.children }
        </TransitionGroup>
      </div>
    );
  }
}

export default RouteContainer;
