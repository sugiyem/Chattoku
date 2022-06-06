import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

import { fetchGroupMembers } from "../../firebase/FetchGroup";
import RenderGroupDetail, {
  memberType
} from "../../components/Friend/RenderGroupDetail";

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
      type={memberType.PENDING_MEMBER}
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
