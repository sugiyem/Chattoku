import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import {
  BoldText,
  Button,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { fetchFriend } from "../../services/Friend/FetchFriendStatus";
import { firebase } from "../../services/Firebase/Config";
import {
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../services/Friend/FetchGroup";
import { fetchGroupAdminIDs } from "../../services/Friend/FetchGroupAdmin";
import { groupMemberType } from "../../constants/Group";
import AddMemberComponent from "../../components/Friend/AddMemberComponent";

const AddGroupMemberScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [membersID, setMembersID] = useState([]);
  const [pendingMembersID, setPendingMembersID] = useState([]);
  const [adminsID, setAdminsID] = useState([]);
  const groupInfo = route.params.groupInfo;
  const isOwner = groupInfo.owner === firebase.auth().currentUser.uid;

  useEffect(() => {
    return fetchFriend({
      onSuccess: (data) => setFriends(data),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => setMembersID(data.map((item) => item.id)),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchPendingGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => setPendingMembersID(data.map((item) => item.id)),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchGroupAdminIDs({
      groupID: groupInfo.id,
      onSuccess: setAdminsID
    });
  }, []);

  function getMemberType(item) {
    return item.id === groupInfo.owner
      ? groupMemberType.OWNER
      : adminsID.includes(item.id)
      ? groupMemberType.ADMIN
      : membersID.includes(item.id)
      ? groupMemberType.MEMBER
      : pendingMembersID.includes(item.id)
      ? groupMemberType.PENDING_MEMBER
      : groupMemberType.NON_MEMBER;
  }

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search friend"
      />

      <BoldText underline>Add Friends to Group</BoldText>

      <Button onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </Button>

      {filteredFriends.map((item, idx) => (
        <AddMemberComponent
          type={getMemberType(item)}
          isOwner={isOwner}
          key={idx}
          item={item}
          groupID={groupInfo.id}
        />
      ))}
    </ScrollContainer>
  );
};

export default AddGroupMemberScreen;
