import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import ForumList from "../../components/Forum/ForumList";
import { useState, useEffect } from "react";
import { firebase } from "../../services/Firebase/Config";
import FetchFollowedForumsData from "../../services/Forum/FetchFollowedForumData";
import styled from "styled-components/native";
import { Container } from "../../styles/GeneralStyles";
import {
  CreateForumButton,
  CreateForumText,
  RoundDarkButton,
  DarkButtonText,
  ForumHomeTitle
} from "../../styles/ForumStyles";
import { getCurrentUID } from "../../services/Profile/FetchUserInfo";
import Loading from "../../components/Miscellaneous/Loading";

const initialData = [];

const FollowedForumScreen = () => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const currentUID = getCurrentUID();

  console.log(data);

  useEffect(() => {
    setIsLoading(true);
    return FetchFollowedForumsData(currentUID, (forumData) => {
      setData(forumData);
      setIsLoading(false);
    });
  }, []);

  function handleCreateForumClick() {
    navigation.navigate("CreateForum");
  }

  function handleDiscoverForumClick() {
    navigation.replace("ForumHome");
  }

  return (
    <Loading isLoading={isLoading}>
      <Container>
        <RoundDarkButton onPress={handleDiscoverForumClick} testID="homeForum">
          <DarkButtonText> Discover New Forums </DarkButtonText>
        </RoundDarkButton>
        <ForumHomeTitle>Followed Forums</ForumHomeTitle>
        {data.length === 0 ? (
          <NoDataContainer>
            <NoDataText> You are currently not following any forum</NoDataText>
          </NoDataContainer>
        ) : (
          <ForumList data={data} />
        )}
        <CreateForumButton
          onPress={handleCreateForumClick}
          testID="createForum"
        >
          <CreateForumText> Create Your Own Forum</CreateForumText>
        </CreateForumButton>
      </Container>
    </Loading>
  );
};

export default FollowedForumScreen;

const NoDataContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NoDataText = styled.Text`
  text-align: center;
  color: #1f1f1f;
  background-color: #eee;
  font-size: 24px;
  margin: 10px;
  padding: 10px;
  border-color: #1f1f1f;
  border-width: 1px;
  border-radius: 10px;
`;
