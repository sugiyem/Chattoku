import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { fetchGroupMembers } from "../../services/Friend/FetchGroup";
import { groupMemberType } from "../../constants/Group";
import RenderGroupDetail from "../../components/Friend/RenderGroupDetail";
import Loading from "../../components/Miscellaneous/Loading";

const GroupRequestInfoScreen = ({ navigation, route }) => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const groupInfo = route.params.groupData;

  useEffect(() => {
    setIsLoading(true);

    return fetchGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setMembers(data);
        setIsLoading(false);
      },
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  return (
    <Loading isLoading={isLoading}>
      <RenderGroupDetail
        type={groupMemberType.PENDING_MEMBER}
        groupInfo={groupInfo}
        members={members}
        navigation={navigation}
      />
    </Loading>
  );
};

export default GroupRequestInfoScreen;
