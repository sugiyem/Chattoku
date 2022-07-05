import React, { useState } from "react";
import { Avatar } from "react-native-elements";
import ChatModal from "./ChatModal";

const ChatAvatar = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userInfo, navigation } = props;

  const imgSource = userInfo.img
    ? { uri: userInfo.img }
    : require("../../assets/default-profile.png");

  function closeModal() {
    setIsModalVisible(false);
  }

  function openModal() {
    setIsModalVisible(true);
  }

  function openMessage() {
    navigation.navigate("ChatDetail", { userData: userInfo });
  }

  return (
    <>
      <ChatModal
        item={userInfo}
        isVisible={isModalVisible}
        onCloseButtonPress={closeModal}
        onMessageButtonPress={openMessage}
      />
      <Avatar rounded source={imgSource} size={40} onPress={openModal} />
    </>
  );
};

export default ChatAvatar;
