import { StyleSheet } from "react-native";
import React from "react";
import ForumHomeScreen from "./Forum/ForumHomeScreen";
import ForumScreen from "./Forum/ForumScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPostScreen from "./Forum/AddPostScreen";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="ForumHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ForumHome" component={ForumHomeScreen} />
      <Stack.Screen name="Forum" component={ForumScreen} />
      <Stack.Screen name="AddPost" component={AddPostScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
