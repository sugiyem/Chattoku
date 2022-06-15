import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  checkIfUserIsGroupOwner,
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../firebase/FetchGroup";
import { groupMemberType } from "../../constants/Group";
import RenderGroupDetail from "../../components/Friend/RenderGroupDetail";

const GroupInfoScreen = ({ navigation, route }) => {
  const [members, setMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isMemberExpanded, setIsMemberExpanded] = useState(false);
  const [isPendingMemberExpanded, setIsPendingMemberExpanded] = useState(false);
  const groupInfo = route.params.groupData;

  // console.log(members);

  useEffect(() => {
    return fetchGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setMembers(data);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchPendingGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setPendingMembers(data);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    return checkIfUserIsGroupOwner({
      groupID: groupInfo.id,
      onTrue: () => {
        setIsOwner(true);
      },
      onFalse: () => {
        setIsOwner(false);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  return (
    <RenderGroupDetail
      type={isOwner ? groupMemberType.OWNER : groupMemberType.MEMBER}
      groupInfo={groupInfo}
      memberDetails={{
        data: members,
        isExpanded: isMemberExpanded,
        changeExpanded: setIsMemberExpanded
      }}
      pendingMemberDetails={{
        data: pendingMembers,
        isExpanded: isPendingMemberExpanded,
        changeExpanded: setIsPendingMemberExpanded
      }}
      navigation={navigation}
    />
  );
};

export default GroupInfoScreen;
