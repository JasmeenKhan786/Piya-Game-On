import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default class MyChallenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
    };
  }
  updateData = (id) => {
    db.collection("acceptedchallenge")
      .doc(id)
      .update({ status: "Completed" })
      .then((a) => {
        alert("Challenge completed succesfully");
        this.getData();
      })
      .catch((a) => {
        alert("Something went wrong! Try later");
      });
  };
  getData = async () => {
    this.setState({ challenges: [] });
    var responce = await db
      .collection("acceptedchallenge")
      .where("email", "==", firebase.auth().currentUser.email)
      .get();
    responce.docs.map((a) => {
      var temp = this.state.challenges;
      var data = a.data();
      data.id = a.id;
      temp.push(data);
      this.setState({ challenges: temp });
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    if (this.state.challenges.length === 0) {
      return (
        <View style={{ flex: 1 ,backgroundColor:'#dccfbb'}}>
          <View
            style={{
              paddingTop: "15%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: "5%",
              backgroundColor: "#301719",
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" /> 
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Challenges
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}></Text>
          </View>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              marginHorizontal: "5%",
              marginTop: "50%",
              fontSize:18
            }}
          >
            Your Challenges will appear here! Can't find any?
          </Text>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              marginHorizontal: "5%",
              marginTop: 20,
              fontSize:18

            }}
          >
            Take up some challenges
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1,backgroundColor:'#dccfbb' }}>
          <View
            style={{
              paddingTop: "15%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: "5%",
              backgroundColor: "#301719",
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <Ionicons name="home" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              My Challenges
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}></Text>
          </View>

          <ScrollView>
            {this.state.challenges.map((a) => {
              var comp;
              if (a.status === "Accepted") {
                comp = (
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: "5%",
                      marginTop: 15,
                      alignItems:'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.updateData(a.id);
                      }}
                    >
                      <AntDesign name="checksquare" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "bold" ,marginLeft:5}}>
                      Mark as completed
                    </Text>
                  </View>
                );
              } else {
                comp = (
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: "5%",
                      marginTop: 15,
                    }}
                  >
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      Challenge Completed
                    </Text>
                  </View>
                );
              }
              return (
                <View
                key={a.id}
                  style={{
                    backgroundColor: "white",
                    width: "90%",
                    alignSelf: "center",
                    borderRadius: 10,
                    marginTop: 10,
                    flexDirection: "row",
                    padding: 20,
                  }}
                >
                  <Image
                    source={{ uri: a.image }}
                    style={{ width: 100, height: "100%", borderRadius: 10 }}
                  />
                  <View style={{ marginHorizontal: 5,flex:1 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginHorizontal:10,

                      }}
                    >
                      {a.name}
                    </Text>

                    <Text
                      style={{
                        marginHorizontal: "5%",
                        color: "brown",
                      }}
                    >
                      {a.category}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: "5%",
                        marginTop: 10,
                      }}
                    >
                      <FontAwesome name="calendar-o" size={20} color="grey" />
                      <Text style={{ color: "grey", marginLeft: 5 }}>
                        {a.deadline}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: "5%",
                        marginTop: 10,
                      }}
                    >
                      <Feather name="clock" size={20} color="grey" />
                      <Text style={{ color: "grey", marginLeft: 5 }}>
                        {a.timetocomplete}
                      </Text>
                    </View>

                    {comp}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}
