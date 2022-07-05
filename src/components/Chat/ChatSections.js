import React, { useState } from "react";
import { Actions, Bubble, GiftedChat } from "react-native-gifted-chat";
import { sendPrivateChat, sendGroupChat } from "../../services/Chat/HandleChat";
import { DEFAULT_AVATAR_URL } from "../../constants/Chat";
import { chatType } from "../../constants/Chat";
import {
  pickImageFromCamera,
  pickImageFromLibrary,
  uploadImage
} from "../../services/Miscellaneous/HandleImage";
import { Icon } from "react-native-elements";
import Loading from "../Miscellaneous/Loading";
import ChatAvatar from "./ChatAvatar";
import ChatBubble from "./ChatBubble";

const ChatSections = ({
  type,
  userData,
  receiverID,
  messages,
  updateMessages,
  allUserInfos = [],
  navigation
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const userID = userData.id;
  const isPrivateChat = type === chatType.PRIVATE_CHAT;
  const userMessageData = {
    _id: userID,
    name: userData.username,
    avatar: userData.img.length > 0 ? userData.img : DEFAULT_AVATAR_URL
  };

  async function onSend(messageArray) {
    const msg = messageArray[0];
    console.log(msg);
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
      await sendGroupChat(newMsg, receiverID);
    }
  }

  async function onSendImage(imgUrl) {
    await onSend([{ _id: imgUrl, image: imgUrl, user: userMessageData }]);
  }

  async function handleUploadPicture(imgUrl) {
    await uploadImage(
      imgUrl,
      () => setIsLoading(true),
      () => setIsLoading(false),
      onSendImage,
      "Picture has been sent"
    );
  }

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        options={{
          ["Open Camera"]: () => pickImageFromCamera(handleUploadPicture),
          ["Open Gallery"]: () => pickImageFromLibrary(handleUploadPicture)
        }}
        icon={() => <Icon type="ionicon" name="image-outline" color="blue" />}
        onSend={(args) => console.log(args)}
      />
    );
  };

  const renderAvatar = isPrivateChat
    ? null
    : (props) => {
        const userInfo = allUserInfos.filter(
          (item) => item.id === props.currentMessage.user._id
        )[0];

        return (
          <ChatAvatar {...props} userInfo={userInfo} navigation={navigation} />
        );
      };

  const renderBubble = (props) => {
    if (isPrivateChat) {
      return <Bubble {...props} />;
    }

    const username = allUserInfos.filter(
      (item) => item.id === props.currentMessage.user._id
    )[0].username;
    return <ChatBubble {...props} username={username} />;
  };

  return (
    <Loading isLoading={isLoading}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={userMessageData}
        isLoadingEarlier
        renderAvatarOnTop
        renderActions={renderActions}
        renderAvatar={renderAvatar}
        renderBubble={renderBubble}
      />
    </Loading>
  );
};

export default ChatSections;
