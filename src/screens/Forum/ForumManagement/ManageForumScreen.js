import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const ManageForumScreen = () => {
  const navigation = useNavigation();

  function handleEditForumButton() {
    navigation.navigate("EditForum");
  }

  function handleBannedUsersButton() {
    navigation.navigate("BannedUsers");
  }

  // function handleAdminButton() {
  //   navigation.navigate("Admins");
  // }

  return (
    <Container>
      <CustomButton onPress={handleEditForumButton}>
        <ButtonText> Edit Forum Details </ButtonText>
      </CustomButton>
      <CustomButton onPress={handleBannedUsersButton}>
        <ButtonText> Banned Users </ButtonText>
      </CustomButton>
      {/* <CustomButton onPress={handleAdminButton}>
        <ButtonText> Admins </ButtonText>
      </CustomButton> */}
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
