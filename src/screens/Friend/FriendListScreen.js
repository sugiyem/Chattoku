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
import { useNavigation } from "@react-navigation/native";
import {
  fetchFriend,
  checkFriendRequestsReceived
} from "../../services/Friend/FetchFriendStatus";
import { friendshipType } from "../../constants/Friend";
import RenderUserLists from "../../components/Friend/RenderUserLists";
import NotificationText from "../../components/Miscellaneous/NotificationText";

const FriendListScreen = () => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [isRequestExist, setIsRequestExist] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    return fetchFriend({
      onSuccess: setFriends,
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
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search friend by username"
        testID="searchBar"
      />

      <BoldText underline testID="title">
        Friends List
      </BoldText>

      <Button
        onPress={() => navigation.navigate("AddFriend")}
        testID="addFriend"
      >
        <Text>Add more friends</Text>
      </Button>

      <Button
        onPress={() => navigation.navigate("GroupList")}
        testID="groupList"
      >
        <Text>View groups</Text>
      </Button>

      <Button
        onPress={() => navigation.navigate("BlockedUserList")}
        testID="blockedList"
      >
        <Text>View blocked users</Text>
      </Button>

      <ButtonGroup>
        <SeparatedButton
          onPress={() => navigation.navigate("FriendRequestsSent")}
          testID="requestSent"
        >
          <ButtonText size="12px" color="#000000">
            Outgoing Requests
          </ButtonText>
        </SeparatedButton>

        <SeparatedButton
          onPress={() => navigation.navigate("FriendRequestsReceived")}
          testID="requestReceived"
        >
          <NotificationText
            text="Incoming Requests"
            isShown={isRequestExist}
            size={12}
          />
        </SeparatedButton>
      </ButtonGroup>

      <UserLists />
    </ScrollContainer>
  );
};

export default FriendListScreen;
