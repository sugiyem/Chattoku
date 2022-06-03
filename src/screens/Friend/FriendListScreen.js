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
import { Badge } from "react-native-elements";
import { firebase } from "../../firebase/Config";
import { useNavigation } from "@react-navigation/native";
import { fetchFriend } from "../../firebase/FetchFriendStatus";
import RenderUserLists, {
  renderType
} from "../../components/Friend/RenderUserLists";

const FriendListScreen = () => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(null);
  const [isRequestExist, setIsRequestExist] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    return fetchFriend({
      onSuccess: (data) => {
        setFriends(data);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  useEffect(() => {
    const userID = firebase.auth().currentUser.uid;

    return firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("friendRequestsReceived")
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot.size !== 0) {
            setIsRequestExist(true);
          } else {
            setIsRequestExist(false);
          }
        },
        (error) => Alert.alert(error)
      );
  });

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search friend by username"
        style={styles.textInput}
      />

      <Text style={styles.title}>Friends List</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddFriend")}
      >
        <Text>Add more friends</Text>
      </TouchableOpacity>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => navigation.navigate("FriendRequestsSent")}
        >
          <Text style={styles.requestText}>Outgoing Friend Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => navigation.navigate("FriendRequestsReceived")}
        >
          <>
            <Text style={styles.requestText}>Incoming Friend Requests</Text>
            {isRequestExist && (
              <Badge status="primary" value="Request exists" />
            )}
          </>
        </TouchableOpacity>
      </View>

      <RenderUserLists
        type={renderType.FRIEND}
        items={friends.filter((data) =>
          data.username.toLowerCase().startsWith(search.toLowerCase())
        )}
        navigation={navigation}
        expandStatus={(index) => expand === index}
        changeExpand={setExpand}
      />
    </ScrollView>
  );
};

export default FriendListScreen;

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
  buttonGroup: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  requestButton: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "cyan",
    flex: 1
  },
  requestText: {
    textAlign: "center",
    fontSize: 12
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});
