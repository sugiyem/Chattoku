import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  BoldText,
  Button,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import { fetchBlockedUsers } from "../../services/Friend/FetchBlockedUsers";
import { friendshipType } from "../../constants/Friend";
import RenderUserLists from "../../components/Friend/RenderUserLists";

const BlockedUserListScreen = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    return fetchBlockedUsers(setBlockedUsers);
  }, []);

  const filteredBlockedUsers = blockedUsers.filter((data) =>
    data.username.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search requests by username"
      />

      <BoldText underline>Blocked List</BoldText>

      <Button onPress={() => navigation.goBack()}>
        <Text>Back to friend's list</Text>
      </Button>

      <Button onPress={() => navigation.navigate("AddBlockedUser")}>
        <Text>Add blocked users</Text>
      </Button>

      <RenderUserLists
        type={friendshipType.BLOCKED}
        items={filteredBlockedUsers}
        navigation={navigation}
        expandStatus={(index) => expand === index}
        changeExpand={setExpand}
      />
    </ScrollContainer>
  );
};

export default BlockedUserListScreen;
