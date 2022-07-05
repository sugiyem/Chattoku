import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { firebase } from "../../services/Firebase/Config";
import { chatType } from "../../constants/Chat";
import { fetchPrivateChatMessages } from "../../services/Chat/FetchChatMessages";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";
import { useIsFocused } from "@react-navigation/native";

const initialState = {
  username: "",
  img: ""
};

const ChatDetailScreen = ({ navigation, route }) => {
  const userID = firebase.auth().currentUser.uid;
  const recipientID = route.params.recipientID;
  const recipientUsername = route.params.recipientUsername;
  const [userInfo, setUserInfo] = useState(initialState);
  const [messages, setMessages] = useState([]);
  //otherUserID is used to optimize firebase use
  const [otherUserID, setOtherUserID] = useState("");
  const isFocused = useIsFocused();

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
    if (!isFocused) return;
    if (otherUserID === recipientID) return;

    console.log("triggered");
    setOtherUserID(recipientID);

    return fetchPrivateChatMessages({
      recipientID: recipientID,
      onSuccesfulFetch: (data) => {
        setMessages(data);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("ChatList")}
      >
        <Text style={styles.text}>
          {"Currently chatting with " +
            recipientUsername +
            ".\n Click here to go to the private chat list"}
        </Text>
      </TouchableOpacity>

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
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "aquamarine",
    padding: 5,
    margin: 5,
    alignSelf: "stretch"
  },
  text: {
    textAlign: "center"
  }
});
