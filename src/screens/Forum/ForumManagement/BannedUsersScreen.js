import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import BannedUsersList from "../../../components/Forum/ForumManagement/BannedUsersList";
import { getCurrentUID } from "../../../services/Profile/FetchUserInfo";
import { isAuthorizedToBanUsers } from "../../../services/Forum/HandleForumAdmin";
import {
  AquaButton,
  AquaButtonText,
  DarkButton,
  DarkButtonText
} from "../../../styles/ForumStyles";
import { Container } from "../../../styles/GeneralStyles";

const BannedUsersScreen = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const currentUID = getCurrentUID();
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
      <AquaButton onPress={navigation.goBack} testID="goBack">
        <AquaButtonText> Go Back </AquaButtonText>
      </AquaButton>
      {(isOwner || isAuthorized) && (
        <DarkButton onPress={handleAddBannedUsers} testID="addBanned">
          <DarkButtonText>Add Banned Users</DarkButtonText>
        </DarkButton>
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

const Title = styled.Text`
  font-size: 22px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: whitesmoke;
`;
