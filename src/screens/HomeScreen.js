import { StyleSheet } from "react-native";
import React from "react";
import ForumHomeScreen from "./Forum/ForumHomeScreen";
import ForumScreen from "./Forum/ForumScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPostScreen from "./Forum/AddPostScreen";
import ForumPostScreen from "./Forum/ForumPostScreen";
import AddCommentScreen from "./Forum/AddCommentScreen";
import EditPostScreen from "./Forum/EditPostScreen";
import EditCommentScreen from "./Forum/EditCommentScreen";

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
      <Stack.Screen name="EditPost" component={EditPostScreen} />
      <Stack.Screen name="Post" component={ForumPostScreen} />
      <Stack.Screen name="AddComment" component={AddCommentScreen} />
      <Stack.Screen name="EditComment" component={EditCommentScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
