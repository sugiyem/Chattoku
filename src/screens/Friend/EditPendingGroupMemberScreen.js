import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { fetchPendingGroupMembers } from "../../services/Friend/FetchGroup";
import {
  BoldText,
  Button,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import EditMemberComponent from "../../components/Friend/EditMemberComponent";

const EditGroupMemberScreen = ({ navigation, route }) => {
  const [pendingMembers, setPendingMembers] = useState([]);
  const [expand, setExpand] = useState([]);
  const [search, setSearch] = useState("");
  const groupInfo = route.params.groupInfo;

  useEffect(() => {
    return fetchPendingGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setPendingMembers(data);
        setExpand(data.map((item) => false));
      },
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  function changeExpand(index) {
    const newExpand = expand.map((item, id) => (id === index ? !item : item));
    setExpand(newExpand);
  }

  const filteredPendingMembers = pendingMembers.filter((pendingMember) =>
    pendingMember.username.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search pending member by username"
      />

      <BoldText underline>Pending Member's List</BoldText>

      <Button onPress={() => navigation.goBack()}>
        <Text> Go back</Text>
      </Button>

      {filteredPendingMembers.map((item, index) => (
        <EditMemberComponent
          key={index}
          item={item}
          isMember={false}
          groupInfo={groupInfo}
          isExpanded={expand[index]}
          changeExpanded={() => changeExpand(index)}
        />
      ))}
    </ScrollContainer>
  );
};

export default EditGroupMemberScreen;
