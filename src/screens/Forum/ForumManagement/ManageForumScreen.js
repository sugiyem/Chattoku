import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { firebase } from "../../../services/Firebase/Config";
import {
  AquaButton,
  AquaButtonText,
  DarkButton,
  DarkButtonText
} from "../../../styles/ForumStyles";
import { Container } from "../../../styles/GeneralStyles";

const ManageForumScreen = () => {
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const currentUID = firebase.auth().currentUser.uid;
  const isOwner = forumData.owner === currentUID;

  console.log(isOwner);

  function handleEditForumButton() {
    navigation.navigate("EditForum");
  }

  function handleBannedUsersButton() {
    navigation.navigate("BannedUsers");
  }

  function handleAdminButton() {
    navigation.navigate("Admins");
  }

  return (
    <Container>
      <AquaButton onPress={navigation.goBack}>
        <AquaButtonText> Go Back </AquaButtonText>
      </AquaButton>
      <Title> Manage Forum </Title>
      <ButtonContainer>
        {isOwner && (
          <DarkButton onPress={handleEditForumButton}>
            <DarkButtonText> Edit Forum Details </DarkButtonText>
          </DarkButton>
        )}
        <DarkButton onPress={handleBannedUsersButton}>
          <DarkButtonText> Banned Users </DarkButtonText>
        </DarkButton>
        <DarkButton onPress={handleAdminButton}>
          <DarkButtonText> Admins </DarkButtonText>
        </DarkButton>
      </ButtonContainer>
    </Container>
  );
};

export default ManageForumScreen;

const ButtonContainer = styled.View`
  width: 100%;
  margin-bottom: auto;
`;

const Title = styled.Text`
  color: whitesmoke;
  font-size: 25px;
  font-weight: bold;
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  text-align: center;
  text-decoration-line: underline;
  margin-bottom: auto;
`;
