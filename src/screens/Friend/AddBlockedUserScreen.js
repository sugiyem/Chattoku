import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import {
  Button,
  ButtonText,
  Container,
  RowBar,
  SearchButton,
  SeparatedSearchInput
} from "../../styles/GeneralStyles";
import { UserOuterContainer } from "../../styles/ContactStyles";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import GetUserWithUsername from "../../services/Friend/GetUserWithUsername";
import RenderUserFound from "../../components/Friend/RenderUserFound";
import { userFoundType } from "../../constants/UserFound";

const AddBlockedUserScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ownUserName, setOwnUserName] = useState("");
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

  const handleClickOnSearch = () => {
    if (search === ownUserName) {
      Alert.alert("This username is yours", "Search other username to block");
      return;
    }

    GetUserWithUsername({
      specifiedUsername: search,
      onFound: (data) => setUserFound(data),
      onNotFound: () => setUserFound(null)
    });
  };

  return (
    <Container>
      <RowBar>
        <SeparatedSearchInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Block user by its exact username"
          testID="searchBar"
        />

        <SearchButton
          onPress={() => handleClickOnSearch()}
          testID="searchButton"
        >
          <ButtonText color="#ffffff">Search</ButtonText>
        </SearchButton>
      </RowBar>

      <Button onPress={() => navigation.replace("BlockedUserList")} testID="blockedList">
        <ButtonText>Back to blocked list</ButtonText>
      </Button>

      <UserOuterContainer>
        <RenderUserFound type={userFoundType.TO_BLOCK} userData={userFound} />
      </UserOuterContainer>
    </Container>
  );
};

export default AddBlockedUserScreen;
