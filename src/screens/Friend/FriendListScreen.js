import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  CenteredBoldText,
  IconGroup,
  IconText,
  NotificationIcon,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import {
  fetchFriend,
  checkFriendRequestsReceived
} from "../../services/Friend/FetchFriendStatus";
import { friendshipType } from "../../constants/Friend";
import RenderUserLists from "../../components/Friend/RenderUserLists";
import { Icon } from "react-native-elements";
import Loading from "../../components/Miscellaneous/Loading";

const FriendListScreen = () => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [isRequestExist, setIsRequestExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);

    return fetchFriend({
      onSuccess: (data) => {
        setFriends(data);
        setIsLoading(false);
      },
      onFailure: (error) => Alert.alert(error.message)
    });
  }, []);

  useEffect(() => {
    return checkFriendRequestsReceived({
      onFound: () => setIsRequestExist(true),
      onNotFound: () => setIsRequestExist(false),
      onFailure: (error) => Alert.alert(error.message)
    });
  });

  const filteredFriends = friends.filter((item) =>
    item.username.toLowerCase().includes(search.toLowerCase())
  );

  const UserLists = () =>
    filteredFriends.map((item) => (
      <RenderUserLists
        key={item.id}
        item={item}
        type={friendshipType.FRIEND}
        navigation={navigation}
      />
    ));

  return (
    <Loading isLoading={isLoading}>
      <ScrollContainer>
        <SearchInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Search friend by username"
          testID="searchBar"
        />

        <CenteredBoldText underline testID="title">
          Friends List
        </CenteredBoldText>

        <IconGroup>
          <View>
            <Icon
              type="material-community"
              name="account-plus"
              color="navy"
              size={30}
              onPress={() => navigation.navigate("AddFriend")}
              testID="addFriend"
            />
            <IconText>Add Friend</IconText>
          </View>
          <View>
            <Icon
              type="material-community"
              name="account-group"
              color="navy"
              size={30}
              onPress={() => navigation.navigate("GroupList")}
              testID="groupList"
            />
            <IconText>Groups</IconText>
          </View>
          <View>
            <Icon
              type="material-community"
              name="account-cancel"
              color="navy"
              size={30}
              onPress={() => navigation.navigate("BlockedUserList")}
              testID="blockedList"
            />
            <IconText>Blocked</IconText>
          </View>
          <View>
            <NotificationIcon isVisible={isRequestExist}>
              <Icon
                type="material-community"
                name="account-sync"
                color="navy"
                size={30}
                onPress={() => navigation.navigate("FriendRequestsReceived")}
                testID="pendingRequest"
              />
            </NotificationIcon>
            <IconText>Pending</IconText>
          </View>
        </IconGroup>

        <UserLists />
      </ScrollContainer>
    </Loading>
  );
};

export default FriendListScreen;
