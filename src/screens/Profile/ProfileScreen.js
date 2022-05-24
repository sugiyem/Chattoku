import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileEditScreen from "./ProfileEditScreen";
import ProfileHomeScreen from "./ProfileHomeScreen";

const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <Stack.Screen name="EditProfile" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export default ProfileScreen;
