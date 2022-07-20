import styled from "styled-components/native";
import ForumAdminList from "../../../components/Forum/ForumManagement/ForumAdminList";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUID } from "../../../services/Profile/FetchUserInfo";
import {
  AquaButton,
  AquaButtonText,
  DarkButton,
  DarkButtonText
} from "../../../styles/ForumStyles";
import { Container } from "../../../styles/GeneralStyles";

const AdminsScreen = () => {
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const currentUID = getCurrentUID();
  const isOwner = forumData.owner === currentUID;

  console.log(forumData);

  function handleAddAdminPress() {
    navigation.navigate("AddAdmin");
  }

  return (
    <Container>
      <AquaButton onPress={navigation.goBack} testID="goBack">
        <AquaButtonText> Go Back </AquaButtonText>
      </AquaButton>
      {isOwner && (
        <DarkButton onPress={handleAddAdminPress} testID="addAdmin">
          <DarkButtonText>Add Admins</DarkButtonText>
        </DarkButton>
      )}
      <Title> Forum Admins </Title>
      <ForumAdminList forumId={forumData.id} />
    </Container>
  );
};

export default AdminsScreen;

const Title = styled.Text`
  font-size: 22px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: whitesmoke;
`;
