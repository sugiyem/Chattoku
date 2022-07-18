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

  const navigation = useNavigation();

  useEffect(() => {
    return fetchBlockedUsers(setBlockedUsers);
  }, []);

  const filteredBlockedUsers = blockedUsers.filter((data) =>
    data.username.toLowerCase().startsWith(search.toLowerCase())
  );

  const UserLists = () =>
    filteredBlockedUsers.map((item, index) => (
      <RenderUserLists
        key={index}
        type={friendshipType.BLOCKED}
        item={item}
        navigation={navigation}
      />
    ));

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search requests by username"
        testID="searchBar"
      />

      <BoldText underline testID="title">
        Blocked List
      </BoldText>

      <Button onPress={() => navigation.goBack()} testID="goBack">
        <Text>Back to friend's list</Text>
      </Button>

      <Button
        onPress={() => navigation.navigate("AddBlockedUser")}
        testID="addBlocked"
      >
        <Text>Add blocked users</Text>
      </Button>

      <UserLists />
    </ScrollContainer>
  );
};

export default BlockedUserListScreen;
