import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { fetchGroupMembers } from "../../services/Friend/FetchGroup";
import { fetchGroupAdminIDs } from "../../services/Friend/FetchGroupAdmin";
import {
  BoldText,
  Button,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import EditMemberComponent from "../../components/Friend/EditMemberComponent";

const EditGroupMemberScreen = ({ navigation, route }) => {
  const [members, setMembers] = useState([]);
  const [adminIDs, setAdminIDs] = useState([]);
  const [expand, setExpand] = useState(null);
  const [search, setSearch] = useState("");
  const groupInfo = route.params.groupInfo;

  useEffect(() => {
    return fetchGroupMembers({
      groupID: groupInfo.id,
      onSuccess: setMembers,
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchGroupAdminIDs({
      groupID: groupInfo.id,
      onSuccess: setAdminIDs
    });
  }, []);

  function changeExpand(index) {
    expand === index ? setExpand(null) : setExpand(index);
  }

  function isOwner(id) {
    return id === groupInfo.owner;
  }

  function isAdmin(id) {
    return adminIDs.includes(id);
  }

  const filteredMembers = members
    .map((member) => {
      return {
        ...member,
        groupRole: isOwner(member.id)
          ? "Owner"
          : isAdmin(member.id)
          ? "Admin"
          : "Member"
      };
    })
    .filter((member) =>
      member.username.toLowerCase().startsWith(search.toLowerCase())
    );

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search member by username"
      />

      <BoldText underline>Member's List</BoldText>

      <Button onPress={() => navigation.goBack()}>
        <Text> Go back</Text>
      </Button>

      {filteredMembers.map((item, index) => (
        <EditMemberComponent
          key={index}
          item={{
            ...item,
            isAdmin: isAdmin(item.id),
            isOwner: isOwner(item.id)
          }}
          isMember={true}
          groupInfo={{ ...groupInfo, admins: adminIDs }}
          isExpanded={expand === index}
          changeExpanded={() => changeExpand(index)}
        />
      ))}
    </ScrollContainer>
  );
};

export default EditGroupMemberScreen;
