import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import {
  Button,
  ButtonText,
  Container,
  IconGroup,
  IconText,
  RowBar,
  SearchButton,
  SeparatedSearchInput
} from "../../styles/GeneralStyles";
import { UserOuterContainer } from "../../styles/ContactStyles";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import GetUserWithUsername from "../../services/Friend/GetUserWithUsername";
import RenderUserFound from "../../components/Friend/RenderUserFound";
import { userFoundType } from "../../constants/UserFound";
import { Icon } from "react-native-elements";

const AddChatScreen = ({ navigation }) => {
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
      Alert.alert("This username is yours", "Search other username to message");
      return;
    }

    GetUserWithUsername({
      specifiedUsername: search,
      onFound: (data) => setUserFound(data),
      onNotFound: () => setUserFound(null)
    });
  };

  function backToChatList() {
    navigation.goBack();
  }

  function navigateToFriendList() {
    navigation.navigate("Friends", { screen: "FriendList", initial: false });
  }

  return (
    <Container>
      <RowBar>
        <SeparatedSearchInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Message user by its exact username"
          testID="searchBar"
        />

        <SearchButton onPress={() => handleClickOnSearch()}>
          <ButtonText color="#ffffff" testID="searchButton">
            Search
          </ButtonText>
        </SearchButton>
      </RowBar>

      <IconGroup>
        <View>
          <Icon
            type="antdesign"
            name="back"
            color="navy"
            size={30}
            onPress={backToChatList}
            testID="chatList"
          />
          <IconText>Go Back</IconText>
        </View>
        <View>
          <Icon
            type="material-community"
            name="account-multiple"
            color="navy"
            size={30}
            onPress={navigateToFriendList}
            testID="friendList"
          />
          <IconText>View Friends</IconText>
        </View>
      </IconGroup>

      <UserOuterContainer>
        <RenderUserFound type={userFoundType.TO_CHAT} userData={userFound} />
      </UserOuterContainer>
    </Container>
  );
};

export default AddChatScreen;
