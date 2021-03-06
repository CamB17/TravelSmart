'use strict';
import {
  AppRegistry,
  View,
  ToolbarAndroid,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { Header,Title,Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import styles from '../styles/mainstyle.js';
import React, {Component} from 'react';
import Login from './Login';
import ViewContainer from '../components/ViewContainer';
import TextField from 'react-native-md-textinput';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // used to display a progress indicator if waiting for a network response.
      loading: false,
      // entered credentials
      email: '',
      password: ''
    }
  }
 
  // A method to passs the username and password to firebase and make a new user account
  signup() {
    this.setState({
      // When waiting for the firebase server show the loading indicator.
      loading: true
    });
 
    // Make a call to firebase to create a new user.
    this.props.firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password).then(() => {
        // then and catch are methods that we call on the Promise returned from
        // createUserWithEmailAndPassword
        alert('Your account was created!');
        this.setState({
          // Clear out the fields when the user logs in and hide the progress indicator.
          email: '',
          password: '',
          loading: false
        });
        this.props.navigator.push({
          component: Login
        });
    }).catch((error) => {
      // Leave the fields filled when an error occurs and hide the progress indicator.
      this.setState({
        loading: false
      });
      alert("Account creation failed: " + error.message );
    });
  }
 
  render() {
    // The content of the screen should be inputs for a username, password and submit button.
    // If we are loading then we display an ActivityIndicator.
    const content = this.state.loading ? <ActivityIndicator size="large"/> :
        <ViewContainer>

          <View style={styles.logo}>
            <Image source={require('../resources/Smart_Travels.png')}/>
          </View>
                 
          <KeyboardAvoidingView
            behavior="padding">
              
              <TextField
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
                label={"Email Address"}
                dense={false}
                highlightColor={'#42a5f5'}
              />
              <TextField
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
                label={"Password"}
                dense={false}
                highlightColor={'#42a5f5'}
              />
          </KeyboardAvoidingView>
            
            <RoundButton 
              style = {styles.login}
              onPress={this.signup.bind(this)}
              backgroundColors={['#b39ddb', '#ede7f6']}
              text="Signup">
            </RoundButton>
      </ViewContainer>
    ;
    // A simple UI with a toolbar, and content below it.
        return (
                  <Container>
                  
                  {content}
                  </Container>
                )
  }
  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }
}
 
AppRegistry.registerComponent('Signup', () => Signup);