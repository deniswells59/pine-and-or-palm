import React, { Component } from "react";
import * as Animated from "animated/lib/targets/react-dom";

const NavAnimation = WrappedComponent => class NavAnimation
extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: new Animated.Value(1)
    };
  }

  componentWillAppear(cb) {
    Animated.timing(this.state.animate, { toValue: 0, duration: 1000 }).start();
    cb();
  }

  componentWillEnter(cb) {
    setTimeout(
      () => Animated.timing(this.state.animate, { toValue: 0, duration: 1000 }).start(),
      250
    );

    cb();
  }

  componentWillLeave(cb) {
    Animated.timing(this.state.animate, { toValue: -1, duration: 1000 }).start();
    setTimeout(() => cb(), 1000);
  }

  render() {
    const style = {
      left: Animated.template`${this.state.animate.interpolate({
      inputRange: [-1, 1],
      outputRange: ["-100%", "100%"]
      })}`
    };

    return (
      <Animated.div style={style} className="animated-page-wrapper">
        <WrappedComponent {...this.props} />
      </Animated.div>
    );
  }
};

export default NavAnimation;
