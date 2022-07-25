import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { fetchPendingGroupMembers } from "../../services/Friend/FetchGroup";
import {
  BoldText,
  Button,
  ButtonText,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import EditMemberComponent from "../../components/Friend/EditMemberComponent";
import Loading from "../../components/Miscellaneous/Loading";

const EditGroupMemberScreen = ({ navigation, route }) => {
  const [pendingMembers, setPendingMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const groupInfo = route.params.groupInfo;

  useEffect(() => {
    setIsLoading(true);

    return fetchPendingGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setPendingMembers(data);
        setIsLoading(false);
      },
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  const filteredPendingMembers = pendingMembers.filter((pendingMember) =>
    pendingMember.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Loading isLoading={isLoading}>
      <ScrollContainer>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search pending member by username"
          testID="searchBar"
        />

        <BoldText underline testID="title">
          Pending Member's List
        </BoldText>

        <Button onPress={() => navigation.goBack()} testID="goBack">
          <ButtonText> Go back</ButtonText>
        </Button>

        {filteredPendingMembers.map((item, index) => (
          <EditMemberComponent
            key={index}
            item={item}
            isMember={false}
            groupInfo={groupInfo}
          />
        ))}
      </ScrollContainer>
    </Loading>
  );
};

export default EditGroupMemberScreen;
