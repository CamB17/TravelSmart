import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid
} from 'react-native';
//Pages
import Signup from './src/pages/Signup';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import Login from './src/pages/Login';
import Account from './src/pages/Main';
import Activities from './src/pages/Activities'
import styles from './src/styles/mainstyle.js'
import * as firebase from 'firebase';  // Initialize Firebase
  var fireBaseconfig = {
    apiKey: "AIzaSyDquqaFe9lZMmYSAxwdk8INOqJHoeYaFQ8",
    authDomain: "travelsmart-be84b.firebaseapp.com",
    databaseURL: "https://travelsmart-be84b.firebaseio.com",
    projectId: "travelsmart-be84b",
    storageBucket: "travelsmart-be84b.appspot.com",
    messagingSenderId: "412583982908"
  };
  // firebase.initializeApp(fireBaseconfig);
const firebaseApp = firebase.initializeApp(fireBaseconfig);


export default class TravelSmart extends Component {
  constructor(props){
    super(props);
    this.state={
      openingPage: Login
    }
  }
  componentWillMount(){
    //Check if userData is stored on device else open Login
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      let openingPage = {openingPage: Login};
      if(user_data != null){
        this.setState({openingPage:Activities});
      }else{
        this.setState(openingPage);
      }
    });
 
  }
  render() {
    if (this.state.openingPage) {
      return (
        // Take the user to whatever page we set the state to.
        // We will use a transition where the new page will slide in from the Left.
        <NavigationExperimental.Navigator
          initialRoute={{component: this.state.openingPage}}
          configureScene={() => {
            return NavigationExperimental.Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              // Pass the navigator the the page so it can navigate as well.
              // Pass firebaseApp so it can make calls to firebase.
              return React.createElement(route.component, { navigator, firebaseApp});
            }
        }} />
      );
    } else {
      return (
        // Our default loading view while waiting to hear back from firebase
        <View style={styles.container}>
          <ToolbarAndroid title="Login" />
          <View style={styles.body}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      );
}
  }
}

AppRegistry.registerComponent('TravelSmart', () => TravelSmart);
