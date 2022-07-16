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
  DarkButton,
  DarkButtonText,
  ForumHomeTitle
} from "../../styles/ForumStyles";

const initialData = [];

const ForumHomeScreen = () => {
  const [data, setData] = useState(initialData);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log("useEffect triggered");
    return FetchForumData(setData, (e) => Alert.alert(e));
  }, []);

  function handleCreateForumClick() {
    navigation.navigate("CreateForum");
  }

  function navigateToFollowedForumScreen() {
    navigation.replace("FollowedForums");
  }

  return (
    <Container>
      <DarkButton onPress={navigateToFollowedForumScreen}>
        <DarkButtonText> See Forums You Have Followed </DarkButtonText>
      </DarkButton>
      <ForumHomeTitle>Discover forums</ForumHomeTitle>
      <ForumList data={data} />
      <CreateForumButton onPress={handleCreateForumClick}>
        <CreateForumText> Create Your Own Forum </CreateForumText>
      </CreateForumButton>
    </Container>
  );
};

export default ForumHomeScreen;
