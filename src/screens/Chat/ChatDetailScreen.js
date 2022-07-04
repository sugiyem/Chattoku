import React, { useEffect, useState } from "react";
import { Alert, LogBox, StyleSheet, View } from "react-native";
import { firebase } from "../../services/Firebase/Config";
import { chatType } from "../../constants/Chat";
import { fetchPrivateChatMessages } from "../../services/Chat/FetchChatMessages";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";
import { Button, ButtonText } from "../../styles/GeneralStyles";

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
  const recipientID = route.params.recipientID;
  const recipientUsername = route.params.recipientUsername;

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
    return fetchPrivateChatMessages({
      recipientID: recipientID,
      onSuccesfulFetch: (data) => {
        setMessages(data);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.replace("ChatList")}>
        <ButtonText>
          {"Currently chatting with " +
            recipientUsername +
            ".\n Click here to go to the private chat list"}
        </ButtonText>
      </Button>

      <ChatSections
        type={chatType.PRIVATE_CHAT}
        userData={{ ...userInfo, id: userID }}
        receiverID={recipientID}
        messages={messages}
        updateMessages={setMessages}
      />
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkcyan",
    padding: 5
  }
});
