import React from "react";
import { 
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import { Ionicons } from "@expo/vector-icons";

//title, image, description, authorName

export default class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      Blogs: [],
    };
  }
  getData = async () => {
    this.setState({ Blogs: [] });
    var responce = await db.collection("Blogs").get();
    responce.docs.map((b) => {
      var temp = this.state.Blogs;
      var data = b.data();
      data.id = b.id;
      temp.push(data);
      this.setState({ Blogs: temp });
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    if (this.state.Blogs.length == 0) {
      return (
        <View style={{ flex: 1 }}>
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
              Blogs
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}></Text>
          </View>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              marginHorizontal: "5%",
              marginTop: "50%",
            }}
          >
            All blogs will appear here!
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
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
              Blogs
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}></Text>
          </View>

          <ScrollView>
            {this.state.Blogs.map((a) => {
              return (
                <TouchableOpacity
                key={a.id}
                  style={{
                    backgroundColor: "white",
                    width: "90%",
                    padding: 10,
                    alignSelf: "center",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("BlogDetails", { id: a.id });
                  }}
                >
                  <Image
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThUVGAHa0rdViAJ9BSI1s3w3GS_7FfVLXUkA&usqp=CAU",
                    }}
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 10,
                      resizeMode: "cover",
                    }}
                  />
                  <Text
                    style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}
                  >
                    {a.Title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6wpWWQt3JjmYvvRx3FnG9cEGMCl12kHMWw&usqp=CAU",
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        resizeMode: "cover",
                      }}
                    />
                    <Text style={{ marginLeft: 10, color: "grey" }}>
                      {a.authorName}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}
