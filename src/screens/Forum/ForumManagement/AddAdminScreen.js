import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import styled from "styled-components/native";
import GetUserWithUsername from "../../../services/Friend/GetUserWithUsername";
import RenderUserToManage from "../../../components/Forum/ForumManagement/RenderUserToManage";
import { manageType } from "../../../constants/Forum";
import { Container } from "../../../styles/GeneralStyles";
import { AquaButton, AquaButtonText } from "../../../styles/ForumStyles";

const AddAdminScreen = () => {
  const [username, setUsername] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  function handleChangeText(text) {
    setUsername(text);
  }

  function onSearchPress() {
    GetUserWithUsername({
      specifiedUsername: username,
      onFound: (data) => {
        setUserData(data);
      },
      onNotFound: () => {
        setUserData(null);
      }
    }).then(() => setShowUserDetails(true));
  }

  return (
    <Container>
      <AquaButton onPress={navigation.goBack} testID="goBack">
        <AquaButtonText> Go Back </AquaButtonText>
      </AquaButton>
      <Title>Add Forum Admin</Title>
      <SearchContainer>
        <StyledTextInput
          placeholder="Search By Exact Username"
          onChangeText={handleChangeText}
          value={username}
          testID="searchBar"
        />
        <CustomButton onPress={onSearchPress} testID="searchButton">
          <ButtonText> Search </ButtonText>
        </CustomButton>
      </SearchContainer>
      {showUserDetails && (
        <RenderUserToManage
          managementType={manageType.ADMIN}
          userData={userData}
          isAuthorized={true}
        />
      )}
    </Container>
  );
};

export default AddAdminScreen;

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
  color: whitesmoke;
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
