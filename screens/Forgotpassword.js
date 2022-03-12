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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase";

export default class Forgotpassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/GameOn5.png")}
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
          }}
        >
          <ScrollView>
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
            <TouchableOpacity
              style={{
                backgroundColor: "#301719",
                width: "90%",
                height: 40,
                marginTop: 40,
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                if (this.state.email) {
                  firebase
                    .auth()
                    .sendPasswordResetEmail(this.state.email)
                    .then(() => {
                      alert("Password reset link sent!");
                    })
                    .catch((error) => {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      alert(errorMessage);
                    });
                } else {
                  alert("Please fill a valid email!");
                }
              }}
            >
              <Text
                style={{ fontSize: 20, color: "white", alignSelf: "center" }}
              >
                Send reset Password link
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
