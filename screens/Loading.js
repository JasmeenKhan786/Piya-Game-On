import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import firebase from 'firebase';
export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.replace('Home');
      } else {
        this.props.navigation.replace('Login');
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1 , justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="brown"/>
      </View>
    );
  }
}
