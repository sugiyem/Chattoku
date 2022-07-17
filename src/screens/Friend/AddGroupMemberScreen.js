import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  BoldText,
  Button,
  ButtonText,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { fetchFriend } from "../../services/Friend/FetchFriendStatus";
import {
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../services/Friend/FetchGroup";
import {
  addUserToGroup,
  cancelGroupInvitation
} from "../../services/Friend/HandleGroup";
import AddMemberComponent from "../../components/Friend/AddMemberComponent";
import { getSimplifiedGroupRole } from "../../services/Friend/GroupRole";
import { reversedGroupMemberSorter } from "../../services/Friend/Sorter";
import Caution from "../../components/Miscellaneous/Caution";

const AddGroupMemberScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [membersID, setMembersID] = useState([]);
  const [pendingMembersID, setPendingMembersID] = useState([]);
  const groupInfo = route.params.groupInfo;
  const groupID = groupInfo.id;

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

  function onInviteToGroup(id) {
    addUserToGroup(groupID, id);
  }

  function onCancelInvitation(id) {
    Caution("This invitation will be removed", () =>
      cancelGroupInvitation(groupID, id)
    );
  }

  const filteredFriends = friends
    .map((friend) => ({
      ...friend,
      groupRole: getSimplifiedGroupRole(friend.id, membersID, pendingMembersID)
    }))
    .sort(reversedGroupMemberSorter)
    .filter((friend) =>
      friend.username.toLowerCase().startsWith(search.toLowerCase())
    );

  const FriendList = () =>
    filteredFriends.map((item, idx) => (
      <AddMemberComponent
        key={idx}
        item={item}
        onInvite={() => onInviteToGroup(item.id)}
        onCancel={() => onCancelInvitation(item.id)}
      />
    ));

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search friend"
        testID="searchBar"
      />

      <BoldText underline testID="title">
        Add Friends to Group
      </BoldText>

      <Button onPress={() => navigation.goBack()} testID="goBack">
        <ButtonText>Go Back</ButtonText>
      </Button>

      <FriendList />
    </ScrollContainer>
  );
};

export default AddGroupMemberScreen;
