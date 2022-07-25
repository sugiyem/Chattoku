import { useNavigation } from "@react-navigation/native";
import { Button, Platform } from "react-native";
import ForumList from "../../components/Forum/ForumList";
import { useState, useEffect } from "react";
import FetchForumData from "../../services/Forum/FetchForumData";
import styled from "styled-components/native";
import { Container } from "../../styles/GeneralStyles";
import {
  CreateForumButton,
  CreateForumText,
  RoundDarkButton,
  DarkButtonText,
  ForumHomeTitle
} from "../../styles/ForumStyles";
import Loading from "../../components/Miscellaneous/Loading";

const initialData = [];

const ForumHomeScreen = () => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log("useEffect triggered");
    setIsLoading(true);
    return FetchForumData(
      (forumData) => {
        setData(forumData);
        setIsLoading(false);
      },
      (e) => Alert.alert(e)
    );
  }, []);

  function handleCreateForumClick() {
    navigation.navigate("CreateForum");
  }

  function navigateToFollowedForumScreen() {
    navigation.replace("FollowedForums");
  }

  return (
    <Loading isLoading={isLoading}>
      <Container>
        <RoundDarkButton
          onPress={navigateToFollowedForumScreen}
          testID="followedForum"
        >
          <DarkButtonText> See Forums You Have Followed </DarkButtonText>
        </RoundDarkButton>
        <ForumHomeTitle>Discover forums</ForumHomeTitle>
        <ForumList data={data} />
        <CreateForumButton
          onPress={handleCreateForumClick}
          testID="createForum"
        >
          <CreateForumText> Create Your Own Forum </CreateForumText>
        </CreateForumButton>
      </Container>
    </Loading>
  );
};

export default ForumHomeScreen;
