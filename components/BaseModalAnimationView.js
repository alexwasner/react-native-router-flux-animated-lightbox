import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  overlayView:{
    position:'absolute',
    top:0,
    overflow:'hidden',
    backgroundColor:'rgba(0,0,0,0.2)',
    left:0,
    right:0,
    bottom:0
  }
});

/**
 * Used to wrap in child components of ReactTransitionGroup, to specify the animation for enter / leave.
 */
class ModalAnimationView extends Component {
  constructor() {
    super();

    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentWillAppear(callback) {
    this.componentWillEnter(callback);
  }

  componentWillEnter(callback) {
    Animated.spring(this.state.progress, {
      toValue: 1,
      delay: this.props.inDelay,
      easing: this.props.easing,
      duration: this.props.inDuration,
    }).start(callback);
  }

  componentWillLeave(callback) {
    Animated.spring(this.state.progress, {
      toValue: 0,
      delay: this.props.outDelay,
      easing: this.props.easing,
      duration: this.props.outDuration,
    }).start(callback);
  }

  render() {
    const animation = {
      transform: [
        {translateY: this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [Dimensions.get('window').height * -1, 0],
        })}]
    };
    const backgroundColor = this.state.progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)'],
      })

    return (
      <Animated.View style={[styles.overlayView,{backgroundColor:backgroundColor}]}>
        <Animated.View
          pointerEvents={this.props.pointerEvents}
          style={[styles.container, this.props.style, animation]}>
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

ModalAnimationView.defaultProps = {
  inDuration: 250,
  inDelay: 25,
  outDuration: 150,
  outDelay: 0,
  easing: Easing.elastic(0.5),
  pointerEvents: 'box-none',
};

ModalAnimationView.propTypes = {
  style: View.propTypes.style,
  pointerEvents: React.PropTypes.string,
  inDuration: React.PropTypes.number,
  inDelay: React.PropTypes.number,
  outDuration: React.PropTypes.number,
  outDelay: React.PropTypes.number,
  easing: React.PropTypes.func,
};

export default ModalAnimationView;