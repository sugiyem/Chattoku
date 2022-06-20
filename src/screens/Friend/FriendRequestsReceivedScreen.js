import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchFriendRequestsReceived } from "../../services/Friend/FetchFriendStatus";
import { friendshipType } from "../../constants/Friend";
import RenderUserLists from "../../components/Friend/RenderUserLists";

const FriendRequestsSentScreen = () => {
  const [pendingFriends, setPendingFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    return fetchFriendRequestsReceived({
      onSuccess: (data) => {
        setPendingFriends(data);
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
        onChangeText={(text) => setSearch(text)}
        placeholder="Search requests by username"
        style={styles.textInput}
      />

      <Text style={styles.title}>Pending Requests Received</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text>Back to friend's list</Text>
      </TouchableOpacity>

      <RenderUserLists
        type={friendshipType.RECEIVING_REQUEST}
        items={pendingFriends.filter((data) =>
          data.username.toLowerCase().startsWith(search.toLowerCase())
        )}
        navigation={navigation}
        expandStatus={(index) => expand === index}
        changeExpand={setExpand}
      />
    </ScrollView>
  );
};

export default FriendRequestsSentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1
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
  button: {
    margin: 5,
    padding: 5,
    backgroundColor: "aquamarine",
    borderRadius: 10
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 25,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});
