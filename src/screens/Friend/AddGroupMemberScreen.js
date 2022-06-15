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

import { fetchFriend } from "../../firebase/FetchFriendStatus";
import {
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../firebase/FetchGroup";
import { groupMemberType } from "../../constants/Group";
import AddMemberComponent from "../../components/Friend/AddMemberComponent";

const AddGroupMemberScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [membersID, setMembersID] = useState([]);
  const [pendingMembersID, setPendingMembersID] = useState([]);
  const groupID = route.params.groupID;

  useEffect(() => {
    return fetchFriend({
      onSuccess: (data) => setFriends(data),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchGroupMembers({
      groupID: groupID,
      onSuccess: (data) => setMembersID(data.map((item) => item.id)),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchPendingGroupMembers({
      groupID: groupID,
      onSuccess: (data) => setPendingMembersID(data.map((item) => item.id)),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search friend"
        style={styles.textInput}
      />

      <Text style={styles.title}>Add Friends to Group</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>

      {friends
        .filter((data) =>
          data.username.toLowerCase().startsWith(search.toLowerCase())
        )
        .map((item, idx) => (
          <AddMemberComponent
            type={
              membersID.includes(item.id)
                ? groupMemberType.MEMBER
                : pendingMembersID.includes(item.id)
                ? groupMemberType.PENDING_MEMBER
                : groupMemberType.NON_MEMBER
            }
            key={idx}
            item={item}
            groupID={groupID}
          />
        ))}
    </ScrollView>
  );
};

export default AddGroupMemberScreen;

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
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});
