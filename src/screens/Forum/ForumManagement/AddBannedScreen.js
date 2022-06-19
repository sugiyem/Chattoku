import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import styled from "styled-components/native";
import BannedUser from "../../../components/Forum/ForumManagement/BannedUser";
import GetUserWithUsername from "../../../firebase/GetUserWithUsername";
import { isUserBanned } from "../../../components/Forum/ForumManagement/HandleBannedUsers";
import { Text } from "react-native";
import RenderUserToBan from "../../../components/Forum/ForumManagement/RenderUserToBan";

const AddBannedScreen = () => {
  const [username, setUsername] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isBanned, setIsBanned] = useState(false);
  const [reason, setReason] = useState(null);
  const navigation = useNavigation();
  const forumId = navigation.getState().routes[1].params.data.id;

  console.log(userData, isBanned, reason);

  const userDetailsState = {
    ...userData,
    isBanned: isBanned,
    setIsBanned: setIsBanned,
    reason: reason
  };

  function handleChangeText(text) {
    setUsername(text);
  }

  function onSearchPress() {
    GetUserWithUsername({
      specifiedUsername: username,
      onFound: (data) => {
        setUserData(data);
        isUserBanned(forumId, data.id, (result) => {
          setIsBanned(result.isFound);
          setShowUserDetails(true);
          setReason(result.isFound ? result.reason : "");
        });
      },
      onNotFound: () => {
        setShowUserDetails(true);
        setUserData(null);
      }
    });
  }

  return (
    <Container>
      <Title>Ban a User</Title>
      <SearchContainer>
        <StyledTextInput
          placeholder="Search By Exact Username"
          onChangeText={handleChangeText}
          value={username}
        />
        <CustomButton onPress={onSearchPress}>
          <ButtonText> Search </ButtonText>
        </CustomButton>
      </SearchContainer>
      {showUserDetails &&
        (userData ? (
          <RenderUserToBan {...userDetailsState} />
        ) : (
          <Title> No Such User Found </Title>
        ))}
    </Container>
  );
};

export default AddBannedScreen;

const Container = styled.View`
  display: flex;
  background-color: darkcyan;
  padding: 5px;
  padding-top: 10px;
  flex: 1;
`;

const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  margin-left: 5px;
  font-size: 14px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  background-color: white;
  align-self: center;
`;

const Title = styled.Text`
  font-size: 24px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: white;
`;

const CustomButton = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  padding: 10px;
  background-color: navy;
  margin: 20px;
`;

const ButtonText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 14px;
  font-weight: bold;
  color: white;
`;
