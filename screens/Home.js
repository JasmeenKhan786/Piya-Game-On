import React from "react";
import {
  Text,
  View, 
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
 
const cat = [
  {
    id: "01",
    name: "Loose Weight",
    image:
      "https://firebasestorage.googleapis.com/v0/b/game-on-d7fa9.appspot.com/o/ChallengeImages%2FGameOn6.png?alt=media&token=72851047-7638-40ed-9cc7-95ec08bfa302",
  },
  {
    id: "02",
    name: "Maintain Weight",
    image:
      "https://firebasestorage.googleapis.com/v0/b/game-on-d7fa9.appspot.com/o/ChallengeImages%2FGameOn7.png?alt=media&token=51affdbf-054a-4760-a7fa-ab7988f4b2cb",
  },
  {
    id: "03",
    name: "Gain Weight",
    image:
      "https://firebasestorage.googleapis.com/v0/b/game-on-d7fa9.appspot.com/o/ChallengeImages%2FGameOn8.png?alt=media&token=7ba599f6-6ba5-4f89-884f-1d4b3a166c71",
  },
];

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: "5%",
              marginTop: "10%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home</Text>
            <TouchableOpacity
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.props.navigation.replace("Login"); 
                    alert("Logout successful!!");
                  })
                  .catch((error) => {
                    alert("Something went wrong! Try again later.");
                  });
              }}
            >
              <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ddd",
              height: 40,
              width: "90%",
              alignSelf: "center",
              borderRadius: 20,
              marginTop: 30,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <AntDesign name="search1" size={24} color="grey" />
            <TextInput
              style={{ width: "70%", height: 40 }}
              placeholder="Search"
            />
            <Ionicons name="ios-filter" size={24} color="grey" />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              color: "grey",
              marginHorizontal: "5%",
              marginTop: 30,
              fontSize: 20,
            }}
          >
            Top Challenges 
          </Text>
          <Image
            source={require('../assets/Wild.png')}
            style={{ 
              width: "90%",
              alignSelf: "center",
              height: 250,
              marginTop: 20,
              borderRadius: 20,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              color: "grey",
              marginHorizontal: "5%",
              marginTop: 30,
              fontSize: 20,
            }}
          >
            Categories
          </Text>
          <ScrollView horizontal={true}>
            {cat.map((a) => { 
              return (
                <TouchableOpacity
                key={a.id}
                  onPress={() => {
                    this.props.navigation.navigate("Category", { cat: a.name });
                  }}
                >
                  <ImageBackground
                    style={{
                      width: 150,
                      height: 150,
                      marginHorizontal: 10,
                      marginTop: 30,
                      borderRadius: 10,
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center", 
                    }}
                    source={{ uri: a.image }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        textAlign: "center",
                        backgroundColor: "rgba(20,20,20, 0.5)",
                        width: "100%",
                      }}
                    >
                      {a.name}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}
