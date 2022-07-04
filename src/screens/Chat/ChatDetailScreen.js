import React, { useEffect, useState } from "react";
import { Alert, LogBox } from "react-native";
import { ChatContainer } from "../../styles/ChatStyles";
import { firebase } from "../../services/Firebase/Config";
import { chatType } from "../../constants/Chat";
import { fetchPrivateChatMessages } from "../../services/Chat/FetchChatMessages";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";
import ChatHeader from "../../components/Chat/ChatHeader";

const initialState = {
  username: "",
  img: ""
};

// Ignore warnings from Animated (Because of Gifted Chat)
LogBox.ignoreLogs(["Animated"]);

const ChatDetailScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [messages, setMessages] = useState([]);

  const userID = firebase.auth().currentUser.uid;
  const recipientData = route.params.userData;

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: setUserInfo,
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchPrivateChatMessages({
      recipientID: recipientData.id,
      onSuccesfulFetch: setMessages,
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
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
        receiverID={recipientData.id}
        messages={messages}
        updateMessages={setMessages}
      />
    </ChatContainer>
  );
};

export default ChatDetailScreen;
