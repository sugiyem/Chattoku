import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditGenreScreen from "./EditGenreScreen";
import EditProfileScreen from "./EditProfileScreen";
import ProfileHomeScreen from "./ProfileHomeScreen";

const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EditGenre" component={EditGenreScreen} />
    </Stack.Navigator>
  );
};

export default ProfileScreen;
