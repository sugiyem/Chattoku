import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddFriendScreen from "./AddFriendScreen";
import FriendListScreen from "./FriendListScreen";
import FriendRequestsSentScreen from "./FriendRequestsSentScreen";
import FriendRequestsReceivedScreen from "./FriendRequestsReceivedScreen";
import FriendInfoScreen from "./FriendInfoScreen";
import GroupCreationScreen from "./GroupCreationScreen";
import GroupInfoScreen from "./GroupInfoScreen";
import GroupRequestInfoScreen from "./GroupRequestInfoScreen";
import GroupListScreen from "./GroupListScreen";
import GroupRequestsScreen from "./GroupRequestsScreen";
import EditGroupScreen from "./EditGroupScreen";
import AddGroupMemberScreen from "./AddGroupMemberScreen";
import EditGroupMemberScreen from "./EditGroupMemberScreen";
import EditPendingGroupMemberScreen from "./EditPendingGroupMemberScreen";

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
      <Stack.Screen name="GroupList" component={GroupListScreen} />
      <Stack.Screen name="GroupRequests" component={GroupRequestsScreen} />
      <Stack.Screen name="GroupCreation" component={GroupCreationScreen} />
      <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
      <Stack.Screen
        name="GroupRequestInfo"
        component={GroupRequestInfoScreen}
      />
      <Stack.Screen name="EditGroup" component={EditGroupScreen} />
      <Stack.Screen name="AddGroupMember" component={AddGroupMemberScreen} />
      <Stack.Screen name="EditGroupMember" component={EditGroupMemberScreen} />
      <Stack.Screen
        name="EditPendingGroupMember"
        component={EditPendingGroupMemberScreen}
      />
    </Stack.Navigator>
  );
};

export default FriendScreen;
