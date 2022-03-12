import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        alert("Welcome back!!");
        this.props.navigation.replace("Home");
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/GameOn4.png")}
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
          }}
        >
          <ScrollView>
            <Text
              style={{
                marginTop: "88%",
                marginLeft: "5%",
                color: "#4B5742",
                //fontWeight: 'bold',
                fontSize: 45,
                fontFamily: "Courier New ",
              }}
            >
              Login
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                width: "90%",
                alignSelf: "center",
              }}
            >
              <MaterialCommunityIcons
                name="email-open-outline"
                size={24}
                color="grey"
              />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  paddingLeft: 10,
                }}
                placeholder="Email ID"
                onChangeText={(val) => {
                  this.setState({ email: val });
                }}
              ></TextInput>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                width: "90%",
                alignSelf: "center",
              }}
            >
              <AntDesign name="lock" size={24} color="grey" />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  paddingLeft: 10,
                }}
                placeholder="Password"
                onChangeText={(val) => {
                  this.setState({ password: val });
                }}
              ></TextInput>
            </View>
            <Text
              style={{
                marginTop: 10,
                color: "#ccb1a3",
                fontWeight: "bold",
                alignSelf: "flex-end",
                marginHorizontal: "5%",
              }}
              onPress={() => {
                this.props.navigation.navigate("Forgotpassword");
              }}
            >
              Forgot password?
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#ccb1a3",
                width: "90%",
                height: 40,
                marginTop: "10%",
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center",
                alignItems:'center'
              }}
              onPress={() => {
                if (this.state.email && this.state.password) {
                  this.login();
                } else {
                  alert("Please fill all the details!");
                }
              }}
            >
              <Text
                style={{ fontSize: 25, color: "white" }}
              >
                Login
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                marginTop: 40,
                color: "#ccb1a3",
                fontWeight: "bold",
                alignSelf: "center",
                marginHorizontal: "5%",
              }}
              onPress={() => {
                this.props.navigation.replace("Signup");
              }}
            >
              Don't have an account? Sign Up
            </Text>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
