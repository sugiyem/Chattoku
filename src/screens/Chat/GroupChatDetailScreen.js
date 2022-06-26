import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { firebase } from "../../services/Firebase/Config";
import { chatType } from "../../constants/Chat";
import { fetchGroupChatMessages } from "../../services/Chat/FetchChatMessages";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import ChatSections from "../../components/Chat/ChatSections";

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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("GroupChatList")}
      >
        <Text style={styles.text}>
          {"Currently in a group chat with " +
            groupName +
            ".\n Click here to go to the group chat list"}
        </Text>
      </TouchableOpacity>

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
