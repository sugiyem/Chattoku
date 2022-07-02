import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  ButtonGroup,
  ButtonText,
  SeparatedButton
} from "../../styles/GeneralStyles";
import { ChatContainer, ChatInfoContainer } from "../../styles/ChatStyles";
import { firebase } from "../../services/Firebase/Config";
import { chatType } from "../../constants/Chat";
import { fetchPrivateChatMessages } from "../../services/Chat/FetchChatMessages";
import {
  isBlockedByCurrentUser,
  isCurrentUserBlocked,
  blockUser,
  unblockUser
} from "../../services/Friend/HandleBlockedUser";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";
import Caution from "../../components/Miscellaneous/Caution";

const initialState = {
  username: "",
  img: ""
};

const ChatDetailScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [messages, setMessages] = useState([]);
  const [isGetBlocked, setIsGetBlocked] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);

  const userID = firebase.auth().currentUser.uid;
  const recipientID = route.params.recipientID;
  const recipientUsername = route.params.recipientUsername;

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: setUserInfo,
      onFailure: (error) => Alert.alert(error.message)
    });
  }, []);

  useEffect(() => {
    return fetchPrivateChatMessages({
      recipientID: recipientID,
      onSuccesfulFetch: setMessages,
      onFailure: (error) => Alert.alert(error.message)
    });
  }, []);

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

  const blockButtonText = isBlocking ? "Unblock User" : "Block User";

  function handleBlockButtonPress() {
    if (isBlocking) {
      unblockUser(recipientID);
    } else {
      Caution("This user will be blocked", () => blockUser(recipientID));
    }
  }

  return (
    <ChatContainer>
      <ChatInfoContainer>
        <ButtonText>{`Currently chatting with ${recipientUsername}.`}</ButtonText>
      </ChatInfoContainer>

      <ButtonGroup>
        <SeparatedButton onPress={() => navigation.replace("ChatList")}>
          <ButtonText size="12px" color="#000000">
            Chat Lists
          </ButtonText>
        </SeparatedButton>
        <SeparatedButton onPress={handleBlockButtonPress}>
          <ButtonText size="12px" color="#000000">
            {blockButtonText}
          </ButtonText>
        </SeparatedButton>
      </ButtonGroup>

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
