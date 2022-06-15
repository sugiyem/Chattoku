import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import { fetchGroupMembers } from "../../services/Friend/FetchGroup";
import { groupMemberType } from "../../constants/Group";
import RenderGroupDetail from "../../components/Friend/RenderGroupDetail";

const GroupRequestInfoScreen = ({ navigation, route }) => {
  const [members, setMembers] = useState([]);
  const [isMemberExpanded, setIsMemberExpanded] = useState(false);
  const groupInfo = route.params.groupData;

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

  return (
    <RenderGroupDetail
      type={groupMemberType.PENDING_MEMBER}
      groupInfo={groupInfo}
      memberDetails={{
        data: members,
        isExpanded: isMemberExpanded,
        changeExpanded: setIsMemberExpanded
      }}
      navigation={navigation}
    />
  );
};

export default GroupRequestInfoScreen;
