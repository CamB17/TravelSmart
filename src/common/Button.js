import 
	{ View,
	 TouchableNativeFeedback
} from 'react-native';
import React, {Component} from 'react';

export default class RippleButton extends Component {
	render () {
	let {onPress, isRipple, rippleColor, children, style} = this.props;
		return (
			<View>
				<TouchableNativeFeedback
					onPress={this._onPressButton}
        			background={TouchableNativeFeedback.SelectableBackground()}>
      			<View style={{width: 150, height: 100, backgroundColor: 'red'}}>
        		<Text style={{margin: 30}}>Button</Text>
      		</View>
			</TouchableNativeFeedback>
			</View>
		) 
	} 
}