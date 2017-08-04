import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import BaseModalAnimationView from './BaseModalAnimationView'
import TransitionGroup from '../utils/ReactTransitionGroup'

class BaseModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:true
		}
	}
	pop(){
		this.setState({show:false})
		setTimeout(()=>{
			Actions.pop()
		},this.props.outDuration || 250)
	}
	render() {
		let CustomAnimationView = this.props.AnimationView || BaseModalAnimationView;
		return (
      <TransitionGroup  component={View} style={styles.container}
      pointerEvents={'box-none'}>
				{this.state.show ? <CustomAnimationView {...this.props}>
	        {this.props.children}
				</CustomAnimationView>:false}
      </TransitionGroup>
		);
	}
}

const styles = StyleSheet.create({
  container: {
  	zIndex:100,
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default BaseModal