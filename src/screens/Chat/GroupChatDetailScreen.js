import React, { useEffect, useState } from "react";
import { Alert, LogBox } from "react-native";
import { ChatContainer } from "../../styles/ChatStyles";
import { firebase } from "../../services/Firebase/Config";
import { chatType } from "../../constants/Chat";
import { fetchGroupChatMessages } from "../../services/Chat/FetchChatMessages";
import FetchUserInfo, {
  FetchAllUserInfos
} from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";
import ChatHeader from "../../components/Chat/ChatHeader";

const initialState = {
  username: "",
  img: ""
};

// Ignore warnings from Animated (Because of Gifted Chat)
LogBox.ignoreLogs(["Animated"]);

const GroupChatDetailScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [allUserInfos, setAllUserInfos] = useState([]);
  const [messages, setMessages] = useState([]);

  const userID = firebase.auth().currentUser.uid;
  const groupData = route.params.groupData;

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: setUserInfo,
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  useEffect(() => {
    return FetchAllUserInfos(setAllUserInfos);
  }, []);

  useEffect(() => {
    return fetchGroupChatMessages({
      groupID: groupData.id,
      onSuccess: setMessages,
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  return (
    <ChatContainer>
      <ChatHeader
        type={chatType.GROUP_CHAT}
        item={groupData}
        navigation={navigation}
      />

      <ChatSections
        type={chatType.GROUP_CHAT}
        userData={{ ...userInfo, id: userID }}
        receiverID={groupData.id}
        messages={messages}
        updateMessages={setMessages}
        allUserInfos={allUserInfos}
        navigation={navigation}
      />
    </ChatContainer>
  );
};

export default GroupChatDetailScreen;
