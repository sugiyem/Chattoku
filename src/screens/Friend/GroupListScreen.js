import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import {
  BoldText,
  Button,
  ButtonGroup,
  ButtonText,
  ScrollContainer,
  SearchInput,
  SeparatedButton
} from "../../styles/GeneralStyles";
import {
  fetchGroup,
  checkGroupInvitation
} from "../../services/Friend/FetchGroup";
import { groupListType } from "../../constants/Group";
import RenderGroupLists from "../../components/Friend/RenderGroupLists";
import NotificationText from "../../components/Miscellaneous/NotificationText";

const GroupListScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(null);
  const [isInvitationExist, setIsInvitationExist] = useState(false);

  useEffect(() => {
    return fetchGroup({
      onSuccess: setGroups,
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return checkGroupInvitation({
      onFound: () => {
        setIsInvitationExist(true);
      },
      onNotFound: () => {
        setIsInvitationExist(false);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search group by name"
      />

      <BoldText underline>Groups List</BoldText>

      <Button onPress={() => navigation.replace("FriendList")}>
        <Text>Back to friend's list</Text>
      </Button>

      <ButtonGroup>
        <SeparatedButton onPress={() => navigation.navigate("GroupCreation")}>
          <ButtonText size="12px" color="#000000">
            Create Group
          </ButtonText>
        </SeparatedButton>

        <SeparatedButton onPress={() => navigation.navigate("GroupRequests")}>
          <NotificationText
            text="Group Invitations"
            isShown={isInvitationExist}
            size={12}
          />
        </SeparatedButton>
      </ButtonGroup>

      <RenderGroupLists
        type={groupListType.GROUP}
        items={groups.filter((item) =>
          item.name.toLowerCase().startsWith(search.toLowerCase())
        )}
        navigation={navigation}
        expandStatus={(index) => expand === index}
        changeExpand={setExpand}
      />
    </ScrollContainer>
  );
};

export default GroupListScreen;
