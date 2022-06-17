import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { sendPrivateChat, sendGroupChat } from "../../services/Chat/HandleChat";
import { DEFAULT_AVATAR_URL } from "../../constants/Chat";
import { chatType } from "../../constants/Chat";

const ChatSections = ({
  type,
  userData,
  receiverID,
  messages,
  updateMessages
}) => {
  const userID = userData.id;
  const isPrivateChat = type === chatType.PRIVATE_CHAT;

  const onSend = async (messageArray) => {
    const msg = messageArray[0];
    const newMsg = {
      ...msg,
      sentBy: userData.id,
      sentTo: receiverID,
      createdAt: new Date()
    };

    updateMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMsg)
    );

    if (isPrivateChat) {
      await sendPrivateChat(newMsg, receiverID);
    } else {
      sendGroupChat(newMsg, receiverID);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: userID,
        name: userData.username,
        avatar: userData.img.length > 0 ? userData.img : DEFAULT_AVATAR_URL
      }}
      renderUsernameOnMessage
      isLoadingEarlier
      renderAvatarOnTop
    />
  );
};

export default ChatSections;
