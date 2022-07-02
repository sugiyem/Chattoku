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
import { fetchBlockedUsers } from "../../services/Friend/FetchBlockedUsers";
import {
  blockUser,
  unblockUser
} from "../../services/Friend/HandleBlockedUser";
import Caution from "../../components/Miscellaneous/Caution";

const AddBlockedUserScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ownUserName, setOwnUserName] = useState("");
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

  const handleClickOnUser = (isBlocked, id) => {
    if (isBlocked) {
      unblockUser(id);
    } else {
      Caution("This user will be blocked", () => blockUser(id));
    }
  };

  const getTextByBlockStatus = (isBlocked) => {
    return isBlocked ? "Unblock user" : "Block user";
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

    const isBlocked = blockedUsers.includes(item.id);

    function handleUserPress() {
      handleClickOnUser(isBlocked, userFound.id);
    }

    return (
      <UserInnerContainer>
        <RenderImage item={item} />

        <Name color="#ffffff">{userFound.username}</Name>

        <Button onPress={handleUserPress}>
          <EditButtonText>{getTextByBlockStatus(isBlocked)}</EditButtonText>
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
          placeholder="Block user by its exact username"
        />

        <SearchButton onPress={() => handleClickOnSearch()}>
          <ButtonText color="#ffffff">Search</ButtonText>
        </SearchButton>
      </RowBar>

      <Button onPress={() => navigation.replace("BlockedUserList")}>
        <Text>Back to blocked list</Text>
      </Button>

      <UserOuterContainer>
        <RenderUserFound item={userFound} />
      </UserOuterContainer>
    </Container>
  );
};

export default AddBlockedUserScreen;
