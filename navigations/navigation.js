import React from "react";
import Forgotpassword from "../screens/Forgotpassword";
import Signup from "../screens/Signup";
import Loading from "../screens/Loading";
import Login from "../screens/Login";
import Category from "../screens/Category";
import CategoryDetails from "../screens/CategoryDetails";
import BlogDetails from "../screens/BlogDetails";
import Blog from "../screens/Blog";
import Home from "../screens/Home";
import MyChallenges from "../screens/MyChallenges";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Stack1 = createStackNavigator();

function CategoryStack() {
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="Home" component={Home} />
      <Stack1.Screen name="Category" component={Category} />
      <Stack1.Screen name="CategoryDetails" component={CategoryDetails} />
    </Stack1.Navigator>
  );
}

const Stack2 = createStackNavigator();

function BlogStack() {
  return (
    <Stack2.Navigator screenOptions={{ headerShown: false }}>
      <Stack2.Screen name="Blog" component={Blog} />
      <Stack2.Screen name="BlogDetails" component={BlogDetails} />
    </Stack2.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="#301719"
      labeled={true}
      barStyle={{ backgroundColor: "#c58e7f" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            return <Ionicons name={"home"} size={20} color={color} />;
          } else if (route.name === "Blog") {
            return <MaterialIcons name="article" size={24} color={color} />;
          } else if (route.name === "MyChallenges") {
            return (
              <MaterialCommunityIcons
                name="arm-flex-outline"
                size={24}
                color={color}
              />
            );
          }
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={CategoryStack} />
      <Tab.Screen name="Blog" component={BlogStack} />
      <Tab.Screen name="MyChallenges" component={MyChallenges} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
    </Stack.Navigator>
  );
}

export default MyStack;
MyTabs;
BlogStack;
CategoryStack;
