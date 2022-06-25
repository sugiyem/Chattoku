import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { chatType } from "../../constants/Chat";
import {
  fetchActiveGroupChats,
  checkUnreadPrivateMessages
} from "../../services/Chat/FetchActiveChats";
import ActiveChatLists from "../../components/Chat/ActiveChatLists";
import NotificationText from "../../components/Miscellaneous/NotificationText";

const GroupChatListScreen = () => {
  const [search, setSearch] = useState("");
  const [activeChats, setActiveChats] = useState([]);
  const [isUnreadExists, setIsUnreadExists] = useState(false);
  const [expand, setExpand] = useState(null);
  const navigation = useNavigation();

  const expandStatus = (value) => expand === value;

  const changeExpand = (value) => {
    if (expandStatus(value)) {
      setExpand(null);
    } else {
      setExpand(value);
    }
  };

  useEffect(() => {
    return fetchActiveGroupChats({
      onSuccess: (data) => {
        setActiveChats(data);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    return checkUnreadPrivateMessages({
      onFound: () => {
        setIsUnreadExists(true);
      },
      onNotFound: () => {
        setIsUnreadExists(false);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search messages"
        style={styles.textInput}
      />

      <Text style={styles.title}>Group Chat List</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Friends", { screen: "GroupList" })
          }
        >
          <Text style={styles.buttonText}>Message other groups</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("ChatList")}
        >
          <NotificationText text="Private Chat List" isShown={isUnreadExists} />
        </TouchableOpacity>
      </View>

      <ActiveChatLists
        type={chatType.GROUP_CHAT}
        items={activeChats.filter((item) =>
          item.name.toLowerCase().startsWith(search.toLowerCase())
        )}
        expandStatus={expandStatus}
        changeExpand={changeExpand}
        navigation={navigation}
      />
    </ScrollView>
  );
};

export default GroupChatListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    flex: 1,
    padding: 5
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    padding: 2
  },
  buttonGroup: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  button: {
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 5,
    backgroundColor: "aquamarine",
    flex: 1
  },
  buttonText: {
    textAlign: "center"
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});
