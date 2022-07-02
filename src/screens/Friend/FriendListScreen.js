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
import Loading from "../../components/Miscellaneous/Loading";

const FriendListScreen = () => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(null);
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
      onFound: () => {
        setIsRequestExist(true);
      },
      onNotFound: () => {
        setIsRequestExist(false);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  });

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search friend by username"
      />

      <BoldText underline>Friends List</BoldText>

      <Button onPress={() => navigation.navigate("AddFriend")}>
        <Text>Add more friends</Text>
      </Button>

      <Button onPress={() => navigation.navigate("GroupList")}>
        <Text>View groups</Text>
      </Button>

      <Button onPress={() => navigation.navigate("BlockedUserList")}>
        <Text>View blocked users</Text>
      </Button>

      <ButtonGroup>
        <SeparatedButton
          onPress={() => navigation.navigate("FriendRequestsSent")}
        >
          <ButtonText size="12px" color="#000000">
            Outgoing Requests
          </ButtonText>
        </SeparatedButton>

        <SeparatedButton
          onPress={() => navigation.navigate("FriendRequestsReceived")}
        >
          <NotificationText
            text="Incoming Requests"
            isShown={isRequestExist}
            size={12}
          />
        </SeparatedButton>
      </ButtonGroup>

      <RenderUserLists
        type={friendshipType.FRIEND}
        items={friends.filter((data) =>
          data.username.toLowerCase().startsWith(search.toLowerCase())
        )}
        navigation={navigation}
        expandStatus={(index) => expand === index}
        changeExpand={setExpand}
      />
    </ScrollContainer>
  );
};

export default FriendListScreen;
