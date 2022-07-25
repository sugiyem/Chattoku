import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  CenteredBoldText,
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
import Loading from "../../components/Miscellaneous/Loading";

const BlockedUserListScreen = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    return fetchBlockedUsers((data) => {
      setBlockedUsers(data);
      setIsLoading(false);
    });
  }, []);

  const filteredBlockedUsers = blockedUsers.filter((data) =>
    data.username.toLowerCase().includes(search.toLowerCase())
  );

  const UserLists = () =>
    filteredBlockedUsers.map((item) => (
      <RenderUserLists
        key={item.id}
        type={friendshipType.BLOCKED}
        item={item}
        navigation={navigation}
      />
    ));

  return (
    <Loading isLoading={isLoading}>
      <ScrollContainer>
        <SearchInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Search blocked users by username"
          testID="searchBar"
        />

        <CenteredBoldText underline testID="title">
          Blocked List
        </CenteredBoldText>

        <IconGroup>
          <View>
            <Icon
              type="antdesign"
              name="back"
              color="navy"
              size={30}
              onPress={navigation.goBack}
              testID="goBack"
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
              testID="addBlocked"
            />
            <IconText>Block User</IconText>
          </View>
        </IconGroup>

        <UserLists />
      </ScrollContainer>
    </Loading>
  );
};

export default BlockedUserListScreen;
