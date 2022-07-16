import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import {
  BoldText,
  Button,
  IconGroup,
  IconText,
  GradientBackground,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import { fetchFriendRequestsReceived } from "../../services/Friend/FetchFriendStatus";
import { friendshipType } from "../../constants/Friend";
import RenderUserLists from "../../components/Friend/RenderUserLists";
import { Icon } from "react-native-elements";

const FriendRequestsReceivedScreen = () => {
  const [pendingFriends, setPendingFriends] = useState([]);
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    return fetchFriendRequestsReceived({
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
        type={friendshipType.RECEIVING_REQUEST}
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

        <BoldText underline>Pending Requests Received</BoldText>

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
              color="#4C516D"
              size={30}
            />
            <IconText>Request Received</IconText>
          </View>
          <View>
            <Icon
              type="material-community"
              name="account-star"
              color="navy"
              size={30}
              onPress={() => navigation.replace("FriendRequestsSent")}
            />
            <IconText>Request Sent</IconText>
          </View>
        </IconGroup>

        <UserLists />
      </ScrollContainer>
    </GradientBackground>
  );
};

export default FriendRequestsReceivedScreen;
