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
import Loading from "../../components/Miscellaneous/Loading";

const AddGroupMemberScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [membersID, setMembersID] = useState([]);
  const [pendingMembersID, setPendingMembersID] = useState([]);
  const [isFriendLoading, setIsFriendLoading] = useState(false);
  const [isMemberLoading, setIsMemberLoading] = useState(false);
  const [isPendingLoading, setIsPendingLoading] = useState(false);
  const groupInfo = route.params.groupInfo;
  const groupID = groupInfo.id;

  useEffect(() => {
    setIsFriendLoading(true);

    return fetchFriend({
      onSuccess: (data) => {
        setFriends(data);
        setIsFriendLoading(false);
      },
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    setIsMemberLoading(true);

    return fetchGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setMembersID(data.map((item) => item.id));
        setIsMemberLoading(false);
      },
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    setIsPendingLoading(true);

    return fetchPendingGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setPendingMembersID(data.map((item) => item.id));
        setIsPendingLoading(false);
      },
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
      friend.username.toLowerCase().includes(search.toLowerCase())
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
    <Loading isLoading={isFriendLoading || isMemberLoading || isPendingLoading}>
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
    </Loading>
  );
};

export default AddGroupMemberScreen;
