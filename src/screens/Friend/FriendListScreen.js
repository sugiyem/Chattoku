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
import { useNavigation } from "@react-navigation/native";
import {
  fetchFriend,
  checkFriendRequestsReceived
} from "../../firebase/FetchFriendStatus";
import { friendshipType } from "../../constants/Friend";
import RenderUserLists from "../../components/Friend/RenderUserLists";

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
    return checkFriendRequestsReceived({
      onFound: () => {
        setIsRequestExist(true);
      },
      onNotFound: () => {
        setIsRequestExist(false);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
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
          <Text style={styles.requestText}>Outgoing Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => navigation.navigate("FriendRequestsReceived")}
        >
          <View style={styles.requestReceivedContainer}>
            <Text style={styles.requestReceivedTest}>Incoming Requests</Text>
            {isRequestExist && (
              <Badge
                status="primary"
                value="!"
                containerStyle={styles.requestReceivedBadge}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <RenderUserLists
        type={friendshipType.FRIEND}
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
  requestReceivedContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  requestText: {
    textAlign: "center",
    fontSize: 12
  },
  requestReceivedTest: {
    textAlign: "center",
    fontSize: 12,
    flex: 4
  },
  requestReceivedBadge: {
    flex: 1
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});
