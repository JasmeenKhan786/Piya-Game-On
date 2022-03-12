import React from "react";
import {
   Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import { Ionicons } from "@expo/vector-icons";

export default class Category extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      selectedCat: props.route.params.cat,
    };
  }
  getData = async () => { 
    var responce = await db
      .collection("challenges")
      .where("category", "==", this.state.selectedCat)
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
    if(this.state.challenges.length===0){ 
      return(
        <View style={{flex:1}}>
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
          <Text style={{ fontSize: 18, fontWeight: "bold", color:'white' }}>Category</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}></Text>
        </View>
          <Text style={{color:'black', textAlign:'center', marginHorizontal:'5%', marginTop:'50%'}}>
            Challenges in this category will appear here!
          </Text>
        </View>
      )
 
    }
    else{

    return (
      <View style={{ flex: 1, backgroundColor: "#ddd" }}>
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
          <Text style={{ fontSize: 18, fontWeight: "bold", color:'white' }}>Category</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}></Text>
        </View>

        <ScrollView>
            {this.state.challenges.map((a) => {
              return (
                <TouchableOpacity
                key={a.id}
                  style={{ marginHorizontal:'7%' }}
                  onPress={() => {
                    this.props.navigation.navigate("CategoryDetails", {
                      selectedid: a.id,
                    });
                  }} 
                >
                  <ImageBackground
                    source={require("../assets/card.png")}
                    style={{
                      marginTop: 10,
                      width: 300, 
                      alignSelf: "center",
                      borderRadius: 20,
                      overflow: "hidden",
                       height:170,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "white",
                        marginTop: '10%',
                        marginHorizontal:10
                      }}
                    >
                      {a.Title}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{ color: "white", marginTop: 20,
                      marginHorizontal:10 }}
                    >
                      {a.Description}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  }

  }
}
