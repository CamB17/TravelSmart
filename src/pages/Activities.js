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
import { Header,Container,Title, Content, Icon,  Card, CardItem ,Button, Fab,Footer } from 'native-base'
import styles from '../styles/mainstyle.js';

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
    // If we are loading then we display the indicator, if the account is null and we are not loading
    // Then we display nothing. If the account is not null then we display the account info.
    const content = this.state.loading ?
    <ActivityIndicator size="large"/> :
       this.state.user &&
                 <Content>
                  <Card dataArray={this.state.acts}
                    renderRow={(act) => this._renderItem(act)} >
                  </Card>
                </Content>
      ;
      // console.log("loading user",this.state.user,this.state.loading);
    return (
        <Container>
        <Header>
            <Button transparent>
                        <Icon name='ios-menu' />
            </Button>
            <Title>Activities</Title>
            <Button transparent onPress={this.logout.bind(this)}>
                        <Icon name='ios-arrow-back' />
            </Button>
 
        </Header>
        {content}
        <Footer style={styles.Footer}>
          <TextInput
            value={this.state.newAct}
            style={styles.textEdit}
            onChangeText={(text) => this.setState({newAct: text})}
            placeholder="New Activity"
          />
            <Fab
                 active={this.state.active}
                 containerStyle={{ marginRight: 0,width:20 }}
                 style={styles.float}
                 position="bottomRight"
                 onPress={() => this._addAct()}
             >
                 <Icon name="md-add" />
             </Fab>
 
        </Footer>
 
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