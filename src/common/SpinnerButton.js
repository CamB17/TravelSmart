import React from 'react';
import React, {Component} from 'react';
import ButtonComponent from 'react-native-button-component';

export default class SpinnerButton extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);

    this.state = {
      buttonState: 'login',
      progress: 0,
    };

    this.states = {
      login: {
        text: 'Login'.toUpperCase(),
        onPress: this.login,
      },
      onLogin: {
        spinner: true,
        text: 'Login...'.toUpperCase(),
      },
    };

  //   login() {
  //   this.setState({ buttonState: 'onLogin' });
  //   setTimeout(() => {
  //     this.setState({ buttonState: 'login' });
  //   }, 3000);
  // }

    render() {
      return (



      <ButtonComponent
              buttonState={this.state.buttonState}
              states={this.states}
           />
      );
  }






