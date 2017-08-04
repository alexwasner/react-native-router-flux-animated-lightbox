import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import BaseModal from './BaseModal'
import CustomAnimationView from './CustomAnimationView'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

@autobind
class Example extends Component {
	onOK(){	
		this.refs.modal.pop()
	}
	render() {
    //If you don't pass CustomAnimationView, it will use the BaseModalAnimationView
		return (
			<BaseModal ref="modal" AnimationView={CustomAnimationView}>
				<View style={styles.modalWrap}>
					<View style={styles.modal}>
						<Text>This is an animated modal</Text>
						<TouchableOpacity style={styles.button} onPress={this.onOK}>
							<Text style={styles.baseText}>OK</Text>
						</TouchableOpacity>
					</View>
				</View>
			</BaseModal>
		);
	}
}
const styles = StyleSheet.create({
	modalWrap:{
  	justifyContent:'center',
	},
  modal: {
  	backgroundColor:'white',
  	width:300,
  	borderRadius:10, 
  	borderWidth:0,
  	overflow:'hidden',
  	alignItems:'center'
  },
  button:{
  	height:44,
  	justifyContent:'center',
  	borderTopWidth:1,
  	alignItems:'center',
  	borderColor:'#666'
  }
});
export default Example