'use strict';
import React, {
  StyleSheet
} from 'react-native';
 
module.exports = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1
  },

  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },
  
  textEdit:{
    bottom:0,
    flex:1,
    width:300,
  },
  floatButton:{
    flex:1,
    top:48,
    left:50,
    alignSelf:'center',
    backgroundColor:'#34A34F'
  },
  footer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  login: {
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 40,
    marginTop: 30,

  },
  signup : {
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 40,
  },
  textInput: {
    height: 60,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 12,
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 115,
  },
  logoReg: {
    alignItems: 'center',
    marginTop: 130,
    marginBottom: 115,
  },
  // hairline: {
  //   height: 1,
  //   backgroundColor: 'black',
  //   marginBottom: 40,
  //   marginLeft: 40,
  //   marginRight: 40
  // },

});