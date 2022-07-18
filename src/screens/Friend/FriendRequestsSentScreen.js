import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import {
  BoldText,
  Button,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import { fetchFriendRequestsSent } from "../../services/Friend/FetchFriendStatus";
import { friendshipType } from "../../constants/Friend";
import RenderUserLists from "../../components/Friend/RenderUserLists";

const FriendRequestsSentScreen = () => {
  const [pendingFriends, setPendingFriends] = useState([]);
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    return fetchFriendRequestsSent({
      onSuccess: setPendingFriends,
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  const filteredRequests = pendingFriends.filter((item) =>
    item.username.toLowerCase().startsWith(search.toLowerCase())
  );

  const UserLists = () =>
    filteredRequests.map((item, index) => (
      <RenderUserLists
        key={index}
        type={friendshipType.WAITING_RESPONSE}
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
        Pending Requests Sent
      </BoldText>

      <Button onPress={() => navigation.goBack()} testID="goBack">
        <Text>Back to friend's list</Text>
      </Button>

      <UserLists />
    </ScrollContainer>
  );
};

export default FriendRequestsSentScreen;
