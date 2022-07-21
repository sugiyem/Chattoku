import React, { useState } from "react";
import { ListItem } from "react-native-elements";
import { chatType } from "../../constants/Chat";
import {
  removePrivateChat,
  removeGroupChat
} from "../../services/Chat/HandleChat";
import ChatBar from "./ChatBar";
import ChatButtonGroup from "./ChatButtonGroup";
import { itemContainerStyle } from "../../styles/ListStyles";

const ActiveChatLists = ({ type, item, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isPrivateChat = type === chatType.PRIVATE_CHAT;

  function onOpenMessage() {
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
  }

  function onRemoveMessage() {
    isPrivateChat ? removePrivateChat(item.id) : removeGroupChat(item.id);
  }

  const buttonDetails = [
    {
      title: "Open Message",
      type: "material-community",
      icon: "message-processing",
      color: "lightblue",
      onPress: onOpenMessage
    },
    {
      title: "Remove",
      type: "material-community",
      icon: "chat-remove",
      color: "#fd5c63",
      onPress: onRemoveMessage
    }
  ];

  return (
    <ListItem.Accordion
      bottomDivider
      underlayColor="invisible"
      containerStyle={itemContainerStyle}
      content={<ChatBar item={item} isPrivateChat={isPrivateChat} />}
      isExpanded={isExpanded}
      noIcon
      onPress={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded && <ChatButtonGroup buttonDetails={buttonDetails} />}
    </ListItem.Accordion>
  );
};

export default ActiveChatLists;
