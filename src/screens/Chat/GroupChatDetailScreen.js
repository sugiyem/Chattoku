import React, { useEffect, useState } from "react";
import { Alert, LogBox, StyleSheet, View } from "react-native";
import { Button, ButtonText } from "../../styles/GeneralStyles";
import { firebase } from "../../services/Firebase/Config";
import { chatType } from "../../constants/Chat";
import { fetchGroupChatMessages } from "../../services/Chat/FetchChatMessages";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";

const initialState = {
  username: "",
  img: ""
};

// Ignore warnings from Animated (Because of Gifted Chat)
LogBox.ignoreLogs(["Animated"]);

const GroupChatDetailScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [messages, setMessages] = useState([]);

  const userID = firebase.auth().currentUser.uid;
  const groupID = route.params.groupID;
  const groupName = route.params.groupName;

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: (data) => {
        setUserInfo(data);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchGroupChatMessages({
      groupID: groupID,
      onSuccess: (data) => {
        setMessages(data);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.replace("GroupChatList")}>
        <ButtonText>
          {"Currently in a group chat with " +
            groupName +
            ".\n Click here to go to the group chat list"}
        </ButtonText>
      </Button>

      <ChatSections
        type={chatType.GROUP_CHAT}
        userData={{ ...userInfo, id: userID }}
        receiverID={groupID}
        messages={messages}
        updateMessages={setMessages}
      />
    </View>
  );
};

export default GroupChatDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkcyan",
    padding: 5
  }
});
