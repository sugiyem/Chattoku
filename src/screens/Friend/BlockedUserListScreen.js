import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  BoldText,
  Button,
  GradientBackground,
  IconGroup,
  IconText,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import { fetchBlockedUsers } from "../../services/Friend/FetchBlockedUsers";
import { friendshipType } from "../../constants/Friend";
import RenderUserLists from "../../components/Friend/RenderUserLists";
import { Icon } from "react-native-elements";

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
    <GradientBackground>
      <ScrollContainer>
        <SearchInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Search requests by username"
        />

        <BoldText underline>Blocked List</BoldText>

        <IconGroup>
          <View>
            <Icon
              type="antdesign"
              name="back"
              color="navy"
              size={30}
              onPress={navigation.goBack}
            />
            <IconText>Go Back</IconText>
          </View>
          <View>
            <Icon
              type="material-community"
              name="account-remove"
              color="navy"
              size={30}
              onPress={() => navigation.navigate("AddBlockedUser")}
            />
            <IconText>Block User</IconText>
          </View>
        </IconGroup>

        <UserLists />
      </ScrollContainer>
    </GradientBackground>
  );
};

export default BlockedUserListScreen;
