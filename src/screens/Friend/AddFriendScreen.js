import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import {
  Button,
  ButtonText,
  Container,
  RoundedImage,
  RowBar,
  SearchButton,
  SeparatedSearchInput
} from "../../styles/GeneralStyles";
import { EditButtonText, Name } from "../../styles/InfoStyles";
import {
  UserInnerContainer,
  UserOuterContainer
} from "../../styles/ContactStyles";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import GetUserWithUsername from "../../services/Friend/GetUserWithUsername";
import {
  fetchFriend,
  fetchFriendRequestsReceived,
  fetchFriendRequestsSent
} from "../../services/Friend/FetchFriendStatus";
import { fetchBlockedUsers } from "../../services/Friend/FetchBlockedUsers";
import {
  addFriend,
  acceptFriendRequest,
  cancelFriendRequest,
  removeFriend
} from "../../services/Friend/HandleFriend";
import { unblockUser } from "../../services/Friend/HandleBlockedUser";
import { getFriendshipStatus } from "../../services/Friend/FriendshipStatus";
import { friendshipType } from "../../constants/Friend";
import Caution from "../../components/Miscellaneous/Caution";

const AddFriendScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ownUserName, setOwnUserName] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [userFound, setUserFound] = useState(null);

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: (data) => {
        setOwnUserName(data.username);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchFriend({
      onSuccess: (data) => setFriends(data.map((item) => item.id)),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchFriendRequestsSent({
      onSuccess: (data) => setFriendRequestsSent(data.map((item) => item.id)),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchFriendRequestsReceived({
      onSuccess: (data) => {
        setFriendRequestsReceived(data.map((item) => item.id));
      },
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return fetchBlockedUsers((data) =>
      setBlockedUsers(data.map((item) => item.id))
    );
  }, []);

  const handleClickOnSearch = () => {
    if (search === ownUserName) {
      Alert.alert(
        "This username is yours",
        "Search other username to add friend"
      );
      return;
    }

    GetUserWithUsername({
      specifiedUsername: search,
      onFound: (data) => setUserFound(data),
      onNotFound: () => setUserFound(null)
    });
  };

  const handleClickOnUser = (friendshipStatus, id) => {
    console.log("clicked");
    if (friendshipStatus === friendshipType.FRIEND) {
      Caution("This user will be removed from your friend's list", () =>
        removeFriend(id)
      );
    } else if (friendshipStatus === friendshipType.WAITING_RESPONSE) {
      Caution("This friend request will be removed", () =>
        cancelFriendRequest(id)
      );
    } else if (friendshipStatus === friendshipType.RECEIVING_REQUEST) {
      acceptFriendRequest(id);
    } else if (friendshipStatus === friendshipType.NON_FRIEND) {
      addFriend(id);
    } else if (friendshipStatus === friendshipType.BLOCKED) {
      unblockUser(id);
    } else {
      return;
    }
  };

  const getTextByStatus = (friendshipStatus) => {
    let ans = "";

    switch (friendshipStatus) {
      case friendshipType.FRIEND:
        ans = "Unfriend";
        break;
      case friendshipType.WAITING_RESPONSE:
        ans = "Cancel request";
        break;
      case friendshipType.RECEIVING_REQUEST:
        ans = "Accept request";
        break;
      case friendshipType.NON_FRIEND:
        ans = "Add friend";
        break;
      case friendshipType.BLOCKED:
        ans = "Unblock user";
        break;
    }

    return ans;
  };

  const RenderImage = ({ item }) => {
    const imageSource =
      item.img.length > 0
        ? { uri: item.img }
        : require("../../assets/default-profile.png");

    return <RoundedImage source={imageSource} />;
  };

  const RenderUserFound = ({ item }) => {
    if (item === null) {
      return <Text> There is no user with such username</Text>;
    }

    const friendshipStatus = getFriendshipStatus(
      item.id,
      friends,
      friendRequestsSent,
      friendRequestsReceived,
      blockedUsers
    );

    function handleUserPress() {
      handleClickOnUser(friendshipStatus, userFound.id);
    }

    return (
      <UserInnerContainer>
        <RenderImage item={item} />

        <Name color="#ffffff">{userFound.username}</Name>

        <Button onPress={handleUserPress}>
          <EditButtonText>{getTextByStatus(friendshipStatus)}</EditButtonText>
        </Button>
      </UserInnerContainer>
    );
  };

  return (
    <Container>
      <RowBar>
        <SeparatedSearchInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Add user by its exact username"
        />

        <SearchButton onPress={() => handleClickOnSearch()}>
          <ButtonText color="#ffffff">Search</ButtonText>
        </SearchButton>
      </RowBar>

      <Button onPress={() => navigation.replace("FriendList")}>
        <Text>Back to friend's list</Text>
      </Button>

      <UserOuterContainer>
        <RenderUserFound item={userFound} />
      </UserOuterContainer>
    </Container>
  );
};

export default AddFriendScreen;
