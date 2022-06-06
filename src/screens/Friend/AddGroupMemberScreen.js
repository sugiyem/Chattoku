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
import { Avatar, Button, ListItem } from "react-native-elements";
import { fetchFriend } from "../../firebase/FetchFriendStatus";
import {
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../firebase/FetchGroup";
import {
  addUserToGroup,
  removeUserFromGroup,
  cancelGroupInvitation
} from "../../firebase/HandleGroup";

const AddGroupMemberScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [membersID, setMembersID] = useState([]);
  const [pendingMembersID, setPendingMembersID] = useState([]);
  const groupID = route.params.groupID;

  const RenderImage = ({ item }) => {
    const imageSource =
      item.img.length > 0
        ? { uri: item.img }
        : require("../../assets/default-profile.png");

    return (
      <Avatar
        rounded
        source={imageSource}
        size="medium"
        containerStyle={styles.userImage}
      />
    );
  };

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
        .map((item, index) => (
          <ListItem.Swipeable
            key={index}
            bottomDivider
            rightContent={
              <Button
                title="Edit"
                icon="Remove"
                onPress={() => {
                  if (membersID.includes(item.id)) {
                    removeUserFromGroup(groupID, item.id);
                  } else if (pendingMembersID.includes(item.id)) {
                    cancelGroupInvitation(groupID, item.id);
                  } else {
                    addUserToGroup(groupID, item.id);
                  }
                }}
              />
            }
          >
            <>
              <RenderImage item={item} />
              <ListItem.Content>
                <ListItem.Title>{item.username}</ListItem.Title>
                <ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
                <ListItem.Subtitle>
                  {membersID.includes(item.id)
                    ? "Member"
                    : pendingMembersID.includes(item.id)
                    ? "Pending Member"
                    : "Not A Member"}
                </ListItem.Subtitle>
              </ListItem.Content>
            </>
          </ListItem.Swipeable>
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
