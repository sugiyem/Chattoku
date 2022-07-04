import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge, Icon, ListItem } from "react-native-elements";
import { chatType } from "../../constants/Chat";
import {
  removePrivateChat,
  removeGroupChat
} from "../../services/Chat/HandleChat";
import ContactImage from "../Friend/ContactImage";

const ActiveChatLists = ({
  type,
  items,
  expandStatus,
  changeExpand,
  navigation
}) => {
  const isPrivateChat = type === chatType.PRIVATE_CHAT;

  console.log(items);

  const onOpenMessage = (item) => {
    if (isPrivateChat) {
      const data = {
        id: item.id,
        username: item.username,
        bio: item.bio,
        img: item.img
      };

      navigation.navigate("ChatDetail", {
        userData: data
      });
    } else {
      const data = {
        id: item.id,
        name: item.name,
        description: item.description,
        img: item.img
      };

      navigation.navigate("GroupChatDetail", {
        groupData: data
      });
    }
  };

  const onRemoveMessage = (item) => {
    if (isPrivateChat) {
      removePrivateChat(item.id);
    } else {
      removeGroupChat(item.id);
    }
  };

  const buttonDetails = [
    {
      title: "Open Message",
      icon: "message",
      color: "blue",
      onPress: onOpenMessage
    },
    {
      title: "Remove",
      icon: "delete",
      color: "red",
      onPress: onRemoveMessage
    }
  ];

  const RenderAccordion = ({ item }) =>
    buttonDetails.map((data, id) => (
      <ListItem key={id} bottomDivider onPress={() => data.onPress(item)}>
        <Icon name={data.icon} size={30} color={data.color} />
        <ListItem.Content>
          <ListItem.Title>{data.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));

  return (
    <View style={styles.chatList}>
      {items.map((item, index) => (
        <ListItem.Accordion
          key={index}
          bottomDivider
          content={
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
                  <Text>
                    {item.lastMessageTime.toDateString() +
                      ", " +
                      item.lastMessageTime.toLocaleTimeString()}
                  </Text>
                </ListItem.Subtitle>
                {item.showNotif && (
                  <Badge
                    status="primary"
                    value="There are unread messages"
                    containerStyle={styles.badgeContainer}
                    textStyle={styles.text}
                  />
                )}
              </ListItem.Content>
            </>
          }
          isExpanded={expandStatus(index)}
          onPress={() => changeExpand(index)}
        >
          {expandStatus(index) && <RenderAccordion item={item} />}
        </ListItem.Accordion>
      ))}
    </View>
  );
};

export default ActiveChatLists;

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
  },
  chatList: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    padding: 5
  }
});
