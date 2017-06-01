import {
  AppRegistry,
  ActivityIndicator,
  AsyncStorage,
  ListView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import React, {Component} from 'react';
import { Header,Container,Title, Content, Icon,  Card, CardItem ,Button, Fab,Footer } from 'native-base';
import styles from '../styles/mainstyle.js';
import TextField from 'react-native-md-textinput';
import ListItem from '../components/ListItem.js';
import Login from './Login';
import FAB from 'react-native-fab'

export default class Activities extends Component {

constructor(props) {
    super(props);
    this.actsRef = this.props.firebaseApp.database().ref();
    this.state = {
      user:null,
      loading: true,
      newAct: ""
    }
  }

  componentDidMount(){
    // start listening for firebase updates
    this.listenForActs(this.actsRef);
  }

//This function places newly created activities to page bdiy
  componentWillMount() {
    // get the current user from firebase
    // const userData = this.props.firebaseApp.auth().currentUser;
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let userData = JSON.parse(user_data_json);
      this.setState({
        user: userData,
        loading: false,
        active:'true',
        tasks:[]
      });
    });

  }
 
//listener to get data from firebase and update listview accordingly
  listenForActs(actsRef) {
  actsRef.on('value', (dataSnapshot) => {
    var acts = [];
    dataSnapshot.forEach((child) => {
      acts.push({
        name: child.val().name,
        _key: child.key
      });
    });
 
    this.setState({
      acts:acts
    });
  });
  }

  render() {
    // console.log("acts value",this.state.acts);
    const content = this.state.loading ?
    <ActivityIndicator size="large"/> :
       this.state.user &&
                 <Content>
                  <Card dataArray={this.state.acts}
                    style={styles.card}
                    renderRow={(act) => this._renderItem(act)} >
                  </Card>
                </Content>
      ;
      // console.log("loading user",this.state.user,this.state.loading);
    return (
        <Container>
        <View style={styles.title}>
            <Text>Planned Activities</Text>
            <Button transparent onPress={this.logout.bind(this)}>
                        <Icon name='ios-arrow-back' position="topLeft" />
            </Button>
 
        </View>
        {content}
        <View style={styles.footer}>
          <TextField
            value={this.state.newAct}
            style={styles.textEdit}
            onChangeText={(text) => this.setState({newAct: text})}
            highlightColor={'#00BCD4'}
            dense={false}
            label="New Activity"
          />
            <FAB
                 active={this.state.active}
                 containerStyle={{ marginRight: 0,width:20,}}
                 buttonColor="#6c5b7b"
                 style={styles.floatButton}
                 position="bottomRight"
                 onClickAction={() => this._addAct()}
             >
                 <Icon name="md-add" />
             </FAB>
 
        </View>
 
      </Container>
    );
  }

  _renderItem(act) {
    // console.log("act",act._key);
    const onActCompletion= () => {
      // console.log("clickrecived",this.actsRef.child(act._key).remove());
      this.actsRef.child(act._key).remove().then(
        function() {
          // fulfillment
          alert("The act "+act.name+" has been completed successfully");
      },
      function() {
        // fulfillment
        alert("The act "+act.name+" has not been removed successfully");
    });
    }
  return (
    <ListItem act={act} onActCompletion={onActCompletion} />
  );
  }
      //Edit Activity
  // _renderItem(act) {
  //   const onActEdit= () => {
  //     this.actsRef.child(act._key).edit().then(
  //       function() {
  //         alert("The act "+act.name+" has been edited");
  //       });
  //   }
  //   return (
  //   <ListItem act={act} onActEdit={onActEdit} />
  //   );
  // }

  //add a new act to firebase app
  _addAct() {
    // console.log("act value",this.state.newAct);
   if (this.state.newAct === "") {
     return;
   }
   this.actsRef.push({ name: this.state.newAct});
   this.setState({newAct: ""});
   alert("Act added successfully");
  }

  logout() {
    // logout, once that is complete, return the user to the login screen.
    AsyncStorage.removeItem('userData').then(() => {
      this.props.firebaseApp.auth().signOut().then(() => {
        this.props.navigator.push({
          component: Login
        });
      });  
    });
 
  }
}


  AppRegistry.registerComponent('Activities', () => Activities);