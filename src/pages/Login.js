'use strict';
import {
  AppRegistry,
  AsyncStorage,
  View,
  ToolbarAndroid,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Image,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import { Header,Container,Title, Picker } from 'native-base';
import React, {Component} from 'react';
import Signup from './Signup';
import Account from './Main'
import styles from '../styles/mainstyle.js';
import Activities from './Activities';
import ViewContainer from '../components/ViewContainer';
import TextField from 'react-native-md-textinput';
import { Button } from 'react-native-material-design';


export default class Login extends Component {
 
  constructor(props){
    super(props);
    // We have the same props as in our signup.js file and they serve the same purposes.
    this.state = {
      loading: false,
      email: '',
      password: ''
    }
  }
 
  render() {
    // The content of the screen should be inputs for a username, password and submit button.
    // If we are loading then we display an ActivityIndicator.
    const content = this.state.loading ?
    <View style={styles.body}>
    <ActivityIndicator size="large"/>
    </View> :
        
        <ViewContainer>
          
          <View style={styles.logo}>
            <Image source={require('../resources/Smart_Travels.png')}/>
          </View>
            
            <View>    
                <TextField
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                  label={"Email Address"}
                  highlightColor={'#42a5f5'}
                  dense={false}
                />                             
                <TextField
                  onChangeText = {(text) => this.setState({password: text})}
                  value={(this.state.password)} 
                  label={'Password'}
                  secureTextEntry={true}
                  highlightColor={'#42a5f5'}
                  dense={false}
                />
            </View>
                  
                <RoundButton
                  style = {styles.login}
                  onPress={this.login.bind(this)}
                  text="Login"
                  backgroundColors={['#b39ddb', '#ede7f6']}
                  gradientStart={{ x: 0.5, y: 0.5 }}
                  gradientEnd={{ x: 1, y: 1 }}
                  spinner={true}
                >
                </RoundButton>
                <Button
                  style = {styles.signup}
                  onPress={this.goToSignup.bind(this)}
                  text="Create Account"
                >
                </Button>
        </ViewContainer>
        
        ;
 
    // A simple UI with a toolbar, and content below it.
        return (
                  <Container>
                            
                  {content}
                </Container>
                );
  }
 
  login(){
    this.setState({
      loading: true
    });
    // Log in and display an alert to tell the user what happened.
    this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
    ).then((userData) =>
      {
        this.setState({
                loading: false
              });
              AsyncStorage.setItem('userData', JSON.stringify(userData));
              this.props.navigator.push({
                component: Activities
              });
      }
    ).catch((error) =>
        {
              this.setState({
                loading: false
              });
        alert('Login Failed. Please try again'+error);
    });
  }
 
  // Go to the signup page
  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }
}

 
AppRegistry.registerComponent('Login', () => Login);