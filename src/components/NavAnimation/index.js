// A left swooping animation on Route change

import React, { Component } from 'react';
import * as Animated from 'react-dom-animated';

const NavAnimation = WrappedComponent => class NavAnimation
 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: new Animated.Value(1)
    };

    this.root = document.getElementById('root');
  }

  // Coming in
  componentWillAppear(cb) {
    this.root.style.overflow = 'scroll';
    Animated.timing(this.state.animate, { toValue: 0, duration: 0 }).start();
    cb();
  }

  // Coming in
  componentWillEnter(cb) {
    root.scrollTo(0, 0);
    setTimeout(
      () => {
        this.root.style.overflow = 'scroll';
        Animated.timing(this.state.animate, { toValue: 0, duration: 1000 }).start()
      },
      250
    );

    cb();
  }

  // Coming out
  componentWillLeave(cb) {
    this.root.style.overflow = 'hidden';
    Animated.timing(this.state.animate, { toValue: -1, duration: 1000 }).start();
    setTimeout(() => cb(), 1000);
  }

  render() {
    let width = window.innerWidth;

    const style = {
      transform: Animated.template`
      translateX(${this.state.animate.interpolate({
      inputRange: [-1, 1],
      outputRange: [`-${width}px`, `${width}px`]
     })})
     `
    };

    return (
      <Animated.div style={style} className="animated-page-wrapper">
        <WrappedComponent {...this.props} />
      </Animated.div>
    );
  }
};

export default NavAnimation;
