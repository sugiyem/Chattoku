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
import CreateForumScreen from "./Forum/CreateForumScreen";
import ForumEditScreen from "./Forum/ForumManagement/ForumEditScreen";
import ManageForumScreen from "./Forum/ForumManagement/ManageForumScreen";
import BannedUsersScreen from "./Forum/ForumManagement/BannedUsersScreen";
import AdminsScreen from "./Forum/ForumManagement/AdminsScreen";
import AddBannedScreen from "./Forum/ForumManagement/AddBannedScreen";
import FollowedForumScreen from "./Forum/FollowedForumScreen";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="ForumHome"
      screenOptions={{ headerShown: false }}
    >
      {/* For displaying forums */}
      <Stack.Screen name="ForumHome" component={ForumHomeScreen} />
      <Stack.Screen name="FollowedForums" component={FollowedForumScreen} />
      {/* For posts of a specific forum */}
      <Stack.Screen name="Forum" component={ForumScreen} />
      <Stack.Screen name="AddPost" component={AddPostScreen} />
      <Stack.Screen name="EditPost" component={EditPostScreen} />
      {/* For comments */}
      <Stack.Screen name="Post" component={ForumPostScreen} />
      <Stack.Screen name="AddComment" component={AddCommentScreen} />
      <Stack.Screen name="EditComment" component={EditCommentScreen} />
      {/* For forum management */}
      <Stack.Screen name="CreateForum" component={CreateForumScreen} />
      <Stack.Screen name="ManageForum" component={ManageForumScreen} />
      <Stack.Screen name="EditForum" component={ForumEditScreen} />
      <Stack.Screen name="AddBanned" component={AddBannedScreen} />
      <Stack.Screen name="BannedUsers" component={BannedUsersScreen} />
      <Stack.Screen name="Admins" component={AdminsScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
