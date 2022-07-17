import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../services/Friend/FetchGroup";
import { fetchGroupAdminIDs } from "../../services/Friend/FetchGroupAdmin";
import { groupMemberType } from "../../constants/Group";
import { groupMemberSorter } from "../../services/Friend/Sorter";
import { getCurrentUID } from "../../services/Profile/FetchUserInfo";
import { getAdvancedGroupRole } from "../../services/Friend/GroupRole";
import RenderGroupDetail from "../../components/Friend/RenderGroupDetail";
import Loading from "../../components/Miscellaneous/Loading";

const GroupInfoScreen = ({ navigation, route }) => {
  const [members, setMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [adminIDs, setAdminIDs] = useState([]);
  const [isMemberLoading, setIsMemberLoading] = useState(false);
  const [isPendingLoading, setIsPendingLoading] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
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
    setIsMemberLoading(true);

    return fetchGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setMembers(data);
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
        setPendingMembers(data);
        setIsPendingLoading(false);
      },
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    setIsAdminLoading(true);

    return fetchGroupAdminIDs({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setAdminIDs(data);
        setIsAdminLoading(false);
      }
    });
  }, []);

  return (
    <Loading isLoading={isAdminLoading || isMemberLoading || isPendingLoading}>
      <RenderGroupDetail
        type={renderType}
        groupInfo={groupInfo}
        members={detailedMembers}
        pendingMembers={pendingMembers}
        navigation={navigation}
      />
    </Loading>
  );
};

export default GroupInfoScreen;
