import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
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

  const filteredGroups = groups.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase())
  );

  const GroupContactLists = () => (
    <View style={styles.listContainer}>
      {filteredGroups.map((item, index) => (
        <RenderGroupLists
          key={index}
          type={groupListType.GROUP}
          item={item}
          navigation={navigation}
        />
      ))}
    </View>
  );

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search group by name"
        testID="searchBar"
      />

      <BoldText underline testID="title">
        Groups List
      </BoldText>

      <Button
        onPress={() => navigation.replace("FriendList")}
        testID="friendList"
      >
        <Text>Back to friend's list</Text>
      </Button>

      <ButtonGroup>
        <SeparatedButton
          onPress={() => navigation.navigate("GroupCreation")}
          testID="createGroup"
        >
          <ButtonText size="12px" color="#000000">
            Create Group
          </ButtonText>
        </SeparatedButton>

        <SeparatedButton
          onPress={() => navigation.navigate("GroupRequests")}
          testID="groupRequests"
        >
          <NotificationText
            text="Group Invitations"
            isShown={isInvitationExist}
            size={12}
          />
        </SeparatedButton>
      </ButtonGroup>

      <GroupContactLists />
    </ScrollContainer>
  );
};

export default GroupListScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    padding: 5
  }
});
