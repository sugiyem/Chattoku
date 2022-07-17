import React, { useEffect, useState } from "react";
import { Alert, LogBox } from "react-native";
import { ChatContainer } from "../../styles/ChatStyles";
import { chatType } from "../../constants/Chat";
import { fetchGroupChatMessages } from "../../services/Chat/FetchChatMessages";
import FetchUserInfo, {
  FetchAllUserInfos,
  getCurrentUID
} from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";
import ChatHeader from "../../components/Chat/ChatHeader";
import Loading from "../../components/Miscellaneous/Loading";

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
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [isAllInfoLoading, setIsAllInfoLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const userID = getCurrentUID();
  const groupData = route.params.groupData;

  useEffect(() => {
    setIsInfoLoading(true);

    return FetchUserInfo({
      onSuccesfulFetch: (data) => {
        setUserInfo(data);
        setIsInfoLoading(false);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  useEffect(() => {
    setIsAllInfoLoading(true);

    return FetchAllUserInfos((data) => {
      setAllUserInfos(data);
      setIsAllInfoLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsMessageLoading(true);

    return fetchGroupChatMessages({
      groupID: groupData.id,
      onSuccess: (data) => {
        setMessages(data);
        setIsMessageLoading(false);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  return (
    <Loading isLoading={isInfoLoading || isAllInfoLoading || isMessageLoading}>
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
    </Loading>
  );
};

export default GroupChatDetailScreen;
