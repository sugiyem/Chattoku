import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        The list of chats is still in progress.{"\n"}
        You can try the chat functionality by messaging your friends in the
        friend tab.
      </Text>
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    flex: 1,
    padding: 5,
  },
  text: {
    textAlign: "center",
  },
});
