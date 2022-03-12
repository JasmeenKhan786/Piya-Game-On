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
import firebase from "firebase";
import db from "../config";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default class Signup extends React.Component {
  signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert("User created!");

        db.collection("users").add({
          email: this.state.email,
          name: this.state.name,
          password: this.state.password,
          age: this.state.age,
        });

        this.props.navigation.replace("Home");
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      comfirmPassword: "",
      name: "",
      age: "",
    };
  }
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
                marginTop: "87%",
                marginLeft: "5%",
                color: "#4B5742",
                //fontWeight: 'bold',
                fontSize: 45,
                fontFamily: "Courier New ",
              }}
            >
              Sign In
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
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={(val) => {
                  this.setState({ password: val });
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
              <Ionicons name="key" size={24} color="grey" />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  paddingLeft: 10,
                }}
                secureTextEntry={true}

                placeholder="confirmPassword"
                onChangeText={(val) => {
                  this.setState({ confirmPassword: val });
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
              <MaterialIcons
                name="drive-file-rename-outline"
                size={24}
                color="grey"
              />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  paddingLeft: 10,
                }}
                placeholder="Name"
                onChangeText={(val) => {
                  this.setState({ name: val });
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
              <MaterialIcons
                name="format-list-numbered"
                size={24}
                color="grey"
              />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  paddingLeft: 10,
                }}
                placeholder="Age"
                onChangeText={(val) => {
                  this.setState({ age: val });
                }}
              ></TextInput>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#ccb1a3",
                width: "90%",
                height: 40,
                marginTop: 40,
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center", 
                alignItems:'center'
              }}
              onPress={() => {
                if (
                  this.state.email &&
                  this.state.confirmPassword &&
                  this.state.password &&
                  this.state.name &&
                  this.state.age
                ) {
                  if (this.state.confirmPassword === this.state.password) {
                    this.signUp();
                  } else {
                    alert("Passwords dont match");
                  }
                } else {
                  alert("Please fill all the details!"); 
                }
              }}
            >
              <Text
                style={{ fontSize: 25, color: "white", alignSelf: "center" }}
              >
                Sign up
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                marginTop: 30,
                color: "#ccb1a3",
                fontWeight: "bold",
                alignSelf: "center",
                marginHorizontal: "5%",
              }}
              onPress={() => {
                this.props.navigation.replace("Login");
              }}
            >
              Already have an account? Login
            </Text>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
