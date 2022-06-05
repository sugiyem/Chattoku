import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddFriendScreen from "./AddFriendScreen";
import FriendListScreen from "./FriendListScreen";
import FriendRequestsSentScreen from "./FriendRequestsSentScreen";
import FriendRequestsReceivedScreen from "./FriendRequestsReceivedScreen";
import FriendInfoScreen from "./FriendInfoScreen";

const Stack = createNativeStackNavigator();

const FriendScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="FriendList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FriendList" component={FriendListScreen} />
      <Stack.Screen
        name="FriendRequestsSent"
        component={FriendRequestsSentScreen}
      />
      <Stack.Screen
        name="FriendRequestsReceived"
        component={FriendRequestsReceivedScreen}
      />
      <Stack.Screen name="AddFriend" component={AddFriendScreen} />
      <Stack.Screen name="FriendInfo" component={FriendInfoScreen} />
    </Stack.Navigator>
  );
};

export default FriendScreen;
