import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  BoldText,
  IconGroup,
  IconText,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import { fetchFriendRequestsSent } from "../../services/Friend/FetchFriendStatus";
import { friendshipType } from "../../constants/Friend";
import RenderUserLists from "../../components/Friend/RenderUserLists";
import { Icon } from "react-native-elements";

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
      />

      <BoldText underline>Pending Requests Sent</BoldText>

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
            name="account-sync"
            color="navy"
            size={30}
            onPress={() => navigation.replace("FriendRequestsReceived")}
          />
          <IconText>Request Received</IconText>
        </View>
        <View>
          <Icon
            type="material-community"
            name="account-star"
            color="#4C516D"
            size={30}
          />
          <IconText>Request Sent</IconText>
        </View>
      </IconGroup>

      <UserLists />
    </ScrollContainer>
  );
};

export default FriendRequestsSentScreen;
