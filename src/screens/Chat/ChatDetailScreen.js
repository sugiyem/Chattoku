import React, { useEffect, useState } from "react";
import { Alert, LogBox } from "react-native";
import { ChatContainer } from "../../styles/ChatStyles";
import { firebase } from "../../services/Firebase/Config";
import { chatType } from "../../constants/Chat";
import { fetchPrivateChatMessages } from "../../services/Chat/FetchChatMessages";
import {
  isBlockedByCurrentUser,
  isCurrentUserBlocked
} from "../../services/Friend/HandleBlockedUser";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";
import ChatHeader from "../../components/Chat/ChatHeader";
import { useIsFocused } from "@react-navigation/native";

const initialState = {
  username: "",
  img: ""
};

// Ignore warnings from Animated (Because of Gifted Chat)
LogBox.ignoreLogs(["Animated"]);

const ChatDetailScreen = ({ navigation, route }) => {
  const userID = firebase.auth().currentUser.uid;
  const recipientData = route.params.userData;
  const recipientID = recipientData.id;

  const [userInfo, setUserInfo] = useState(initialState);
  const [messages, setMessages] = useState([]);
  const [isGetBlocked, setIsGetBlocked] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  //otherUserID is used to optimize firebase use
  const [otherUserID, setOtherUserID] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: setUserInfo,
      onFailure: (error) => Alert.alert(error.message)
    });
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    if (otherUserID === recipientID) return;

    console.log("triggered");
    setOtherUserID(recipientID);

    return fetchPrivateChatMessages({
      recipientID: recipientID,
      onSuccesfulFetch: setMessages,
      onFailure: (error) => Alert.alert(error.message)
    });
  }, [isFocused]);

  useEffect(() => {
    return isBlockedByCurrentUser(
      recipientID,
      () => setIsBlocking(true),
      () => setIsBlocking(false)
    );
  }, []);

  useEffect(() => {
    return isCurrentUserBlocked(
      recipientID,
      () => setIsGetBlocked(true),
      () => setIsGetBlocked(false)
    );
  }, []);

  return (
    <ChatContainer>
      <ChatHeader
        type={chatType.PRIVATE_CHAT}
        item={recipientData}
        navigation={navigation}
      />

      <ChatSections
        type={chatType.PRIVATE_CHAT}
        userData={{ ...userInfo, id: userID }}
        receiverID={recipientID}
        messages={messages}
        updateMessages={setMessages}
        isBlocking={isBlocking}
        isGetBlocked={isGetBlocked}
      />
    </ChatContainer>
  );
};

export default ChatDetailScreen;
