import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import {
  BoldText,
  Button,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { fetchGroupInvitation } from "../../services/Friend/FetchGroup";
import { groupListType } from "../../constants/Group";
import RenderGroupLists from "../../components/Friend/RenderGroupLists";

const GroupRequestsScreen = ({ navigation }) => {
  const [groupRequests, setGroupRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(null);

  useEffect(() => {
    return fetchGroupInvitation({
      onSuccess: setGroupRequests,
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  // console.log(groupRequests);

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search group requests"
      />

      <BoldText underline>Group Requests List</BoldText>

      <Button onPress={() => navigation.replace("GroupList")}>
        <Text>Go Back</Text>
      </Button>

      <RenderGroupLists
        type={groupListType.GROUP_INVITATION}
        items={groupRequests.filter((item) =>
          item.name.toLowerCase().startsWith(search.toLowerCase())
        )}
        navigation={navigation}
        expandStatus={(index) => expand === index}
        changeExpand={setExpand}
      />
    </ScrollContainer>
  );
};

export default GroupRequestsScreen;
