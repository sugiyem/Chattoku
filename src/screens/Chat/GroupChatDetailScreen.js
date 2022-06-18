import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { firebase } from "../../services/Firebase/Config";
import { sendGroupChat } from "../../services/Chat/HandleChat";
import { DEFAULT_AVATAR_URL } from "../../constants/Chat";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import FetchGroupChat from "../../services/Chat/FetchGroupChat";

const initialState = {
  username: "",
  img: ""
};

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
    return FetchGroupChat({
      groupID: groupID,
      onSuccess: (data) => {
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
      sentTo: groupID,
      createdAt: new Date()
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMsg)
    );

    await sendGroupChat(newMsg, groupID);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("ChatList")}
      >
        <Text style={styles.text}>
          {"Currently in a group chat with " +
            groupName +
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

export default GroupChatDetailScreen;

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
