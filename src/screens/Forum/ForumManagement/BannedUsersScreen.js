import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import BannedUsersList from "../../../components/Forum/ForumManagement/BannedUsersList";
import { firebase } from "../../../services/Firebase/Config";
import { isAuthorizedToBanUsers } from "../../../services/Forum/HandleForumAdmin";

const BannedUsersScreen = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const currentUID = firebase.auth().currentUser.uid;
  const isOwner = forumData.owner === currentUID;

  useEffect(() => {
    if (isOwner) return;

    return isAuthorizedToBanUsers(forumData.id, setIsAuthorized);
  });

  console.log(forumData);

  function handleAddBannedUsers() {
    navigation.navigate("AddBanned");
  }

  return (
    <Container>
      {(isOwner || isAuthorized) && (
        <CustomButton onPress={handleAddBannedUsers}>
          <ButtonText>Add Banned Users</ButtonText>
        </CustomButton>
      )}
      <Title> Banned Users </Title>
      <BannedUsersList
        forumId={forumData.id}
        isAuthorized={isOwner || isAuthorized}
      />
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
