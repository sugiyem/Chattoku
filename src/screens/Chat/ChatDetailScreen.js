import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { firebase } from "../../firebase/Config";
import { sendPrivateChat } from "../../firebase/HandleChat";
import { DEFAULT_AVATAR_URL } from "../../constants/Chat";
import FetchUserInfo from "../../firebase/FetchUserInfo";
import FetchPrivateChat from "../../firebase/FetchPrivateChat";

const initialState = {
  username: "",
  img: ""
};

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
    return FetchPrivateChat({
      recipientID: recipientID,
      onSuccesfulFetch: (data) => {
        setMessages(data);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  const onSend = async (messageArray) => {
    const msg = messageArray[0];
    const newMsg = {
      ...msg,
      sentBy: userID,
      sentTo: recipientID,
      createdAt: new Date()
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMsg)
    );

    await sendPrivateChat(newMsg, recipientID);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("ChatList")}
      >
        <Text style={styles.text}>
          {"Currently chatting with " +
            recipientUsername +
            ".\n Click here to go to the chat list"}
        </Text>
      </TouchableOpacity>

      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: userID,
          name: userInfo.username,
          avatar: userInfo.img.length > 0 ? userInfo.img : DEFAULT_AVATAR_URL
        }}
        renderUsernameOnMessage
        isLoadingEarlier
        renderAvatarOnTop
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
