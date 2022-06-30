import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { firebase } from "../../services/Firebase/Config";
import {
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../services/Friend/FetchGroup";
import { fetchGroupAdminIDs } from "../../services/Friend/FetchGroupAdmin";
import { groupMemberType } from "../../constants/Group";
import RenderGroupDetail from "../../components/Friend/RenderGroupDetail";

const GroupInfoScreen = ({ navigation, route }) => {
  const [members, setMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [adminIDs, setAdminIDs] = useState([]);
  const [isMemberExpanded, setIsMemberExpanded] = useState(false);
  const [isPendingMemberExpanded, setIsPendingMemberExpanded] = useState(false);
  const groupInfo = route.params.groupData;
  const currentID = firebase.auth().currentUser.uid;

  function isOwner(id) {
    return id === groupInfo.owner;
  }

  function isAdmin(id) {
    return adminIDs.includes(id);
  }

  const renderType = isOwner(currentID)
    ? groupMemberType.OWNER
    : isAdmin(currentID)
    ? groupMemberType.ADMIN
    : groupMemberType.MEMBER;

  const detailedMembers = members.map((member) => {
    return {
      ...member,
      groupRole: isOwner(member.id)
        ? "Owner"
        : isAdmin(member.id)
        ? "Admin"
        : "Member"
    };
  });

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
      groupInfo={{ ...groupInfo, admins: adminIDs }}
      memberDetails={{
        data: detailedMembers,
        isExpanded: isMemberExpanded,
        changeExpanded: setIsMemberExpanded
      }}
      pendingMemberDetails={{
        data: pendingMembers,
        isExpanded: isPendingMemberExpanded,
        changeExpanded: setIsPendingMemberExpanded
      }}
      adminLists={adminIDs}
      navigation={navigation}
    />
  );
};

export default GroupInfoScreen;
