import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Badge, ListItem } from "react-native-elements";
import ContactImage from "../Friend/ContactImage";

const ChatBar = ({ item, isPrivateChat }) => {
  const date = item.lastMessageTime;
  const dateString = date
    ? date.toDateString() + ", " + date.toLocaleTimeString()
    : "";

  const NotificationBadge = () => (
    <Badge status="primary" value="!" containerStyle={styles.badgeContainer} />
  );

  return (
    <View style={styles.barContainer}>
      <ContactImage item={item} />
      <ListItem.Content>
        <ListItem.Title style={styles.username} testID="name">
          {isPrivateChat ? item.username : item.name}
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text testID="lastMessage">{item.lastMessage}</Text>
        </ListItem.Subtitle>
        <ListItem.Subtitle>
          <Text>{dateString}</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      {item.showNotif && <NotificationBadge />}
    </View>
  );
};

export default ChatBar;

const styles = StyleSheet.create({
  username: {
    fontWeight: "600",
    textDecorationLine: "underline",
    color: "darkslateblue"
  },
  badgeContainer: {
    position: "absolute",
    right: 10
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});
