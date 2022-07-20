import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import GetUserWithUsername from "../../../services/Friend/GetUserWithUsername";
import RenderUserToManage from "../../../components/Forum/ForumManagement/RenderUserToManage";
import { firebase } from "../../../services/Firebase/Config";
import { isAuthorizedToBanUsers } from "../../../services/Forum/HandleForumAdmin";
import { manageType } from "../../../constants/Forum";
import { Container } from "../../../styles/GeneralStyles";
import { AquaButton, AquaButtonText } from "../../../styles/ForumStyles";

const AddBannedScreen = () => {
  const [username, setUsername] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const currentUID = firebase.auth().currentUser.uid;
  const isOwner = forumData.owner === currentUID;

  useEffect(() => {
    if (isOwner) return;

    return isAuthorizedToBanUsers(forumData.id, setIsAuthorized);
  }, []);

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
      <AquaButton onPress={navigation.goBack}>
        <AquaButtonText> Go Back </AquaButtonText>
      </AquaButton>
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
      {showUserDetails && (
        <RenderUserToManage
          userData={userData}
          managementType={manageType.BAN}
          isAuthorized={isOwner || isAuthorized}
        />
      )}
    </Container>
  );
};

export default AddBannedScreen;

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
  border-width: 0.5px;
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
