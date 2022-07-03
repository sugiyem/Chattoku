import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { firebase } from "../../../services/Firebase/Config";

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
      <BackButton onPress={navigation.goBack}>
        <BackButtonText> Go Back </BackButtonText>
      </BackButton>
      <Title> Manage Forum </Title>
      <ButtonContainer>
        {isOwner && (
          <CustomButton onPress={handleEditForumButton}>
            <ButtonText> Edit Forum Details </ButtonText>
          </CustomButton>
        )}
        <CustomButton onPress={handleBannedUsersButton}>
          <ButtonText> Banned Users </ButtonText>
        </CustomButton>
        <CustomButton onPress={handleAdminButton}>
          <ButtonText> Admins </ButtonText>
        </CustomButton>
      </ButtonContainer>
    </Container>
  );
};

export default ManageForumScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: darkcyan;
`;

const ButtonContainer = styled.View`
  width: 100%;
  margin-bottom: auto;
`;

const CustomButton = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  padding: 15px;
  background-color: navy;
  margin: 20px;
`;

const ButtonText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 15px;
  font-weight: bold;
  color: white;
`;

const BackButton = styled.TouchableOpacity`
  align-self: stretch;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  border-width: 1px;
  background-color: aquamarine;
`;

const BackButtonText = styled.Text`
  text-align: center;
  color: blue;
`;

const Title = styled.Text`
  color: #bdd0e7;
  font-size: 25px;
  font-weight: bold;
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  text-align: center;
  text-decoration-line: underline;
  margin-bottom: auto;
`;
