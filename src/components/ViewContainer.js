import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet
} from 'react-native'

export default class ViewContainer extends Component {
	render() {
		return (
			<View style={styles.ViewContainer}>
				{this.props.children}
			
			</View>
		)
	}
}

//Create stylesheet here
const styles = StyleSheet.create ({
	ViewContainer: {
//React native layout uses flex
//Everything written as Strings
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	}
})