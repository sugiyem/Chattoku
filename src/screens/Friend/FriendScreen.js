import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddFriendScreen from "./AddFriendScreen";
import FriendListScreen from "./FriendListScreen";

const Stack = createNativeStackNavigator();

const FriendScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="FriendList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FriendList" component={FriendListScreen} />
      <Stack.Screen name="AddFriend" component={AddFriendScreen} />
    </Stack.Navigator>
  );
};

export default FriendScreen;
