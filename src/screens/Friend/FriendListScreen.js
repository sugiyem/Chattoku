import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  BoldText,
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
    item.username.toLowerCase().startsWith(search.toLowerCase())
  );

  const UserLists = () =>
    filteredFriends.map((item, index) => (
      <RenderUserLists
        key={index}
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
        />

        <BoldText underline>Friends List</BoldText>

        <IconGroup>
          <View>
            <Icon
              type="material-community"
              name="account-plus"
              color="navy"
              size={30}
              onPress={() => navigation.navigate("AddFriend")}
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
