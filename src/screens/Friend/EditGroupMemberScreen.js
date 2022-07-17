import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { fetchGroupMembers } from "../../services/Friend/FetchGroup";
import { fetchGroupAdminIDs } from "../../services/Friend/FetchGroupAdmin";
import {
  BoldText,
  Button,
  ButtonText,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import EditMemberComponent from "../../components/Friend/EditMemberComponent";
import { groupMemberSorter } from "../../services/Friend/Sorter";
import { getAdvancedGroupRole } from "../../services/Friend/GroupRole";
import Loading from "../../components/Miscellaneous/Loading";

const EditGroupMemberScreen = ({ navigation, route }) => {
  const [members, setMembers] = useState([]);
  const [adminIDs, setAdminIDs] = useState([]);
  const [search, setSearch] = useState("");
  const [isMemberLoading, setIsMemberLoading] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const groupInfo = route.params.groupInfo;
  const memberIDs = members.map((user) => user.id);

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
    setIsAdminLoading(true);

    return fetchGroupAdminIDs({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setAdminIDs(data);
        setIsAdminLoading(false);
      }
    });
  }, []);

  const filteredMembers = members
    .map((member) => ({
      ...member,
      groupRole: getAdvancedGroupRole(
        member.id,
        groupInfo.owner,
        adminIDs,
        memberIDs,
        []
      )
    }))
    .sort(groupMemberSorter)
    .filter((member) =>
      member.username.toLowerCase().startsWith(search.toLowerCase())
    );

  return (
    <Loading isLoading={isAdminLoading || isMemberLoading}>
      <ScrollContainer>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search member by username"
        />

        <BoldText underline>Member's List</BoldText>

        <Button onPress={() => navigation.goBack()}>
          <ButtonText> Go back</ButtonText>
        </Button>

        {filteredMembers.map((item, index) => (
          <EditMemberComponent
            key={index}
            item={item}
            isMember={true}
            groupInfo={groupInfo}
          />
        ))}
      </ScrollContainer>
    </Loading>
  );
};

export default EditGroupMemberScreen;
