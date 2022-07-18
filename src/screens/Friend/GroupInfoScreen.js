import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../services/Friend/FetchGroup";
import { fetchGroupAdminIDs } from "../../services/Friend/FetchGroupAdmin";
import { getCurrentUID } from "../../services/Profile/FetchUserInfo";
import { groupMemberType } from "../../constants/Group";
import { groupMemberSorter } from "../../services/Friend/Sorter";
import { getAdvancedGroupRole } from "../../services/Friend/GroupRole";
import RenderGroupDetail from "../../components/Friend/RenderGroupDetail";

const GroupInfoScreen = ({ navigation, route }) => {
  const [members, setMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [adminIDs, setAdminIDs] = useState([]);
  const groupInfo = route.params.groupData;
  const currentID = getCurrentUID();
  const memberIDs = members.map((user) => user.id);
  const pendingMemberIDs = pendingMembers.map((user) => user.id);

  const renderType = adminIDs.includes(currentID)
    ? currentID === groupInfo.owner
      ? groupMemberType.OWNER
      : groupMemberType.ADMIN
    : groupMemberType.MEMBER;

  const detailedMembers = members
    .map((member) => ({
      ...member,
      groupRole: getAdvancedGroupRole(
        member.id,
        groupInfo.owner,
        adminIDs,
        memberIDs,
        pendingMemberIDs
      )
    }))
    .sort(groupMemberSorter);

  console.log(detailedMembers);

  useEffect(() => {
    return fetchGroupMembers({
      groupID: groupInfo.id,
      onSuccess: setMembers,
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchPendingGroupMembers({
      groupID: groupInfo.id,
      onSuccess: setPendingMembers,
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchGroupAdminIDs({
      groupID: groupInfo.id,
      onSuccess: setAdminIDs
    });
  }, []);

  return (
    <RenderGroupDetail
      type={renderType}
      groupInfo={groupInfo}
      members={detailedMembers}
      pendingMembers={pendingMembers}
      navigation={navigation}
    />
  );
};

export default GroupInfoScreen;
