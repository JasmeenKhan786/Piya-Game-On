import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native'; 
import MyStack from './navigations/navigation';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Courier New ": require("./assets/cour.ttf"),
 
};


export default class App extends React.Component{ 
  constructor(props) {
    super(props); 
    this.state = {
      fontsLoaded: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() { 
    this._loadFontsAsync();
  }

 
  render(){
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
    return(
      <NavigationContainer>
         
        <MyStack/> 
    </NavigationContainer>
    );
    }
  }
}
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#AFCBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
