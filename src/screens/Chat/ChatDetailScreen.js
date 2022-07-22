import React, { useEffect, useState } from "react";
import { Alert, LogBox } from "react-native";
import { ChatContainer } from "../../styles/ChatStyles";
import { chatType } from "../../constants/Chat";
import { fetchPrivateChatMessages } from "../../services/Chat/FetchChatMessages";
import {
  isBlockedByCurrentUser,
  isCurrentUserBlocked
} from "../../services/Friend/HandleBlockedUser";
import FetchUserInfo, {
  getCurrentUID
} from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";
import ChatHeader from "../../components/Chat/ChatHeader";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../../components/Miscellaneous/Loading";

const initialState = {
  username: "",
  img: ""
};

// Ignore warnings from Animated (Because of Gifted Chat)
LogBox.ignoreLogs(["Animated"]);

const ChatDetailScreen = ({ navigation, route }) => {
  const userID = getCurrentUID();
  const recipientData = route.params.userData;
  const recipientID = recipientData.id;

  const [userInfo, setUserInfo] = useState(initialState);
  const [messages, setMessages] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [isBlockedLoading, setIsBlockedLoading] = useState(false);
  const [isBlockingLoading, setIsBlockingLoading] = useState(false);
  //otherUserID is used to optimize firebase use
  const [otherUserID, setOtherUserID] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsInfoLoading(true);

    return FetchUserInfo({
      onSuccesfulFetch: (data) => {
        setUserInfo(data);
        setIsInfoLoading(false);
      },
      onFailure: (error) => Alert.alert(error.message)
    });
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    if (otherUserID === recipientID) return;

    console.log("triggered");
    setOtherUserID(recipientID);
    setIsMessageLoading(true);

    return fetchPrivateChatMessages({
      recipientID: recipientID,
      onSuccesfulFetch: (data) => {
        setMessages(data);
        setIsMessageLoading(false);
      },
      onFailure: (error) => Alert.alert(error.message)
    });
  }, [isFocused]);

  useEffect(() => {
    setIsBlockingLoading(true);

    return isBlockedByCurrentUser(
      recipientID,
      () => {
        setIsBlocking(true);
        setIsBlockingLoading(false);
      },
      () => {
        setIsBlocking(false);
        setIsBlockingLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    setIsBlockedLoading(true);

    return isCurrentUserBlocked(
      recipientID,
      () => {
        setIsBlocked(true);
        setIsBlockedLoading(false);
      },
      () => {
        setIsBlocked(false);
        setIsBlockedLoading(false);
      }
    );
  }, []);

  return (
    <Loading
      isLoading={
        isInfoLoading ||
        isMessageLoading ||
        isBlockedLoading ||
        isBlockingLoading
      }
    >
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
          isBlocked={isBlocked}
        />
      </ChatContainer>
    </Loading>
  );
};

export default ChatDetailScreen;
