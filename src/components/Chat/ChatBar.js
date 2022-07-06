import { StyleSheet, Text } from "react-native";
import React from "react";
import { Badge, ListItem } from "react-native-elements";
import ContactImage from "../Friend/ContactImage";

const ChatBar = ({ item, isPrivateChat }) => {
  const dateString =
    item.lastMessageTime.toDateString() +
    ", " +
    item.lastMessageTime.toLocaleTimeString();

  const NotificationBadge = () => (
    <Badge
      status="primary"
      value="There are unread messages"
      containerStyle={styles.badgeContainer}
      textStyle={styles.text}
    />
  );

  return (
    <>
      <ContactImage item={item} />
      <ListItem.Content>
        <ListItem.Title style={styles.username}>
          {isPrivateChat ? item.username : item.name}
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text>Last message: {item.lastMessage}</Text>
        </ListItem.Subtitle>
        <ListItem.Subtitle>
          <Text>{dateString}</Text>
        </ListItem.Subtitle>
        {item.showNotif && <NotificationBadge />}
      </ListItem.Content>
    </>
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
    marginTop: 5
  },
  text: {
    fontSize: 11
  }
});
