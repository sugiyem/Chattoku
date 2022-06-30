import styled from "styled-components/native";
import ForumAdminList from "../../../components/Forum/ForumManagement/ForumAdminList";
import { useNavigation } from "@react-navigation/native";

const AdminsScreen = () => {
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;

  console.log(forumData);

  return (
    <Container>
      <CustomButton onPress={() => {}}>
        <ButtonText>Add Admins</ButtonText>
      </CustomButton>
      <Title> Forum Admins </Title>
      <ForumAdminList forumId={forumData.id} />
    </Container>
  );
};

export default AdminsScreen;

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

const Title = styled.Text`
  font-size: 22px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: white;
`;
