import styled from "styled-components/native";
import ForumAdminList from "../../../components/Forum/ForumManagement/ForumAdminList";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../services/Firebase/Config";

const AdminsScreen = () => {
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const currentUID = firebase.auth().currentUser.uid;
  const isOwner = forumData.owner === currentUID;

  console.log(forumData);

  function handleAddAdminPress() {
    navigation.navigate("AddAdmin");
  }

  return (
    <Container>
      <BackButton onPress={navigation.goBack}>
        <BackButtonText> Go Back </BackButtonText>
      </BackButton>
      {isOwner && (
        <CustomButton onPress={handleAddAdminPress}>
          <ButtonText>Add Admins</ButtonText>
        </CustomButton>
      )}
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
  font-size: 22px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: white;
`;
