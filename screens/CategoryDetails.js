import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import db from "../config";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

export default class CategoryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      name: "",
      description: "",
      deadline: "",
      category: "",
      timetocomplete: "",
      selectedid: props.route.params.selectedid,
    };
  }
  addData = () => {
    db.collection("acceptedchallenge").add({
      email: firebase.auth().currentUser.email,
      status: "Accepted",
      image: this.state.image,
      name: this.state.name,
      description: this.state.description,
      deadline: this.state.deadline,
      category: this.state.category,
      timetocomplete: this.state.timetocomplete,
    });
    alert("Challenge Accepted");
  };
  getData = async () => {
    var responce = await db
      .collection("challenges")
      .doc(this.state.selectedid)
      .get();

    this.setState({
      image: responce.data().Image,
      name: responce.data().Title,
      description: responce.data().Description,
      deadline: responce.data().Deadline,
      category: responce.data().category,
      timetocomplete: responce.data().Timetocomplete,
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: "100%", height: 200 }}
          source={{ uri: this.state.image }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(20,20,20,0.5)",
            width: 40,
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            marginLeft: "5%",
            marginTop: "15%",
          }}
          onPress={() => {
            this.props.navigation.navigate("Category");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#dccfbb",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                marginHorizontal: "5%",
                marginTop: 30,
              }}
            >
              {this.state.name}
            </Text>
            <Text
              style={{ color: "grey", marginHorizontal: "5%", marginTop: 10, fontSize:16 }}
            >
              {this.state.category}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                marginHorizontal: "5%",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="calendar-o" size={20} color="grey" />
                <Text style={{ color: "grey", marginLeft: 10 }}>
                  {this.state.deadline}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              >
                <Feather name="clock" size={20} color="grey" />
                <Text style={{ color: "grey", marginLeft: 10 }}>
                  {this.state.timetocomplete}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginHorizontal: "5%",
                marginTop: 30,
              }}
            >
              Description
            </Text>

            <Text
              style={{
                color: "grey",
                marginHorizontal: "5%",
                marginTop: 20,
                fontSize:15
              }}
            >
              {this.state.description}
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#301719",
                width: "90%", 
                height: 40,
                marginVertical: "10%",
                borderRadius: 15,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                this.addData();
              }}
            >
              <Text style={{ color: "white" }}>Accept Challenge</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
