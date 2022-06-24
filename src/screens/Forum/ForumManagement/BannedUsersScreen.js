import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import BannedUsersList from "../../../components/Forum/ForumManagement/BannedUsersList";

const BannedUsersScreen = () => {
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;

  console.log(forumData);

  function handleAddBannedUsers() {
    navigation.navigate("AddBanned");
  }

  return (
    <Container>
      <CustomButton onPress={handleAddBannedUsers}>
        <ButtonText>Add Banned Users</ButtonText>
      </CustomButton>
      <Title> Banned Users </Title>
      <BannedUsersList forumId={forumData.id} />
    </Container>
  );
};

export default BannedUsersScreen;

const Container = styled.View`
  display: flex;
  background-color: darkcyan;
  padding: 5px;
  padding-top: 10px;
  flex: 1;
`;

const Title = styled.Text`
  font-size: 22px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: white;
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
