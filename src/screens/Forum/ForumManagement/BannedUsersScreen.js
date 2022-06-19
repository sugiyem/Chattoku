import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import BannedUsersList from "../../../components/Forum/ForumManagement/BannedUsersList";

const BannedUsersScreen = () => {
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;

  console.log(forumData);

  return (
    <Container>
      <StyledTextInput placeholder="Ban Users By Username" />
      <Title> Banned Users </Title>
      <BannedUsersList forumId={forumData.id} />
    </Container>
  );
};

export default BannedUsersScreen;

const Container = styled.ScrollView`
  display: flex;
  background-color: darkcyan;
  padding: 5px;
  padding-top: 10px;
  flex: 1;
`;

const StyledTextInput = styled.TextInput`
  flex-direction: row;
  width: 90%;
  margin: 5px;
  padding-left: 10px;
  border-radius: 5px;
  background-color: white;
  padding-bottom: 5px;
  align-self: center;
`;

const Title = styled.Text`
  font-size: 22px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: white;
`;
