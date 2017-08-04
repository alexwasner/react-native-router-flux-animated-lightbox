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
    left:0,
    right:0,
    bottom:0
  }
});

class CustomAnimationView extends Component {
  constructor() {
    super();

    this.state = {
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
      transitionY: new Animated.Value(1),
    };
  }

  componentWillAppear(callback) {
    this.componentWillEnter(callback);
  }

  componentWillEnter(callback) {
    Animated.parallel([
      Animated.spring(this.state.opacity, {
        toValue: 1,
        delay: this.props.inDelay,
        easing: this.props.easing,
        duration: this.props.inDuration,
      }),
      Animated.spring(this.state.scale, {
        toValue: 1,
        delay: this.props.inDelay,
        easing: this.props.easing,
        duration: this.props.inDuration,
      })
    ]).start(callback);
  }

  componentWillLeave(callback) {
    Animated.parallel([
      Animated.spring(this.state.opacity, {
        toValue: 0,
        delay: this.props.outDelay,
        easing: this.props.easing,
        duration: this.props.outDuration,
      }),
      Animated.spring(this.state.transitionY, {
        toValue: 0,
        delay: this.props.outDelay,
        duration: this.props.outDuration,
      })
    ]).start(callback);
  }

  render() {
    const animation = {
      transform: [{
        translateY: this.state.transitionY.interpolate({
          inputRange: [0, 1],
          outputRange: [Dimensions.get('window').height, 0],
        })
      },{
        scale:this.state.scale
      }]
    };

    return (
      <View style={[styles.overlayView]}>
        <Animated.View style={[styles.overlayView,{zIndex:-1,opacity:this.state.opacity,backgroundColor:'rgba(0,0,0,0.2)'}]}/>
        <Animated.View
          pointerEvents={this.props.pointerEvents}
          style={[styles.container, this.props.style, animation]}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

CustomAnimationView.defaultProps = {
  inDuration: 150,
  inDelay: 250,
  outDuration: 150,
  outDelay: 0,
  easing: Easing.elastic(0.5),
  pointerEvents: 'box-none',
};

CustomAnimationView.propTypes = {
  style: View.propTypes.style,
  pointerEvents: React.PropTypes.string,
  inDuration: React.PropTypes.number,
  inDelay: React.PropTypes.number,
  outDuration: React.PropTypes.number,
  outDelay: React.PropTypes.number,
  easing: React.PropTypes.func,
};

export default CustomAnimationView;