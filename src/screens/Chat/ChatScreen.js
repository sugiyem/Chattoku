import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatDetailScreen from "./ChatDetailScreen";
import ChatListScreen from "./ChatListScreen";
import GroupChatListScreen from "./GroupChatListScreen";
import GroupChatDetailScreen from "./GroupChatDetailScreen";
import AddChatScreen from "./AddChatScreen";

const Stack = createNativeStackNavigator();

const ChatScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="GroupChatList" component={GroupChatListScreen} />
      <Stack.Screen name="GroupChatDetail" component={GroupChatDetailScreen} />
      <Stack.Screen name="AddChat" component={AddChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatScreen;
