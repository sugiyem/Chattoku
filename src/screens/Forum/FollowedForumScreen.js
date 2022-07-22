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

const initialData = [];

const FollowedForumScreen = () => {
  const [data, setData] = useState(initialData);
  const navigation = useNavigation();
  const currentUID = firebase.auth().currentUser.uid;

  console.log(data);

  useEffect(() => {
    return FetchFollowedForumsData(currentUID, setData);
  }, []);

  function handleCreateForumClick() {
    navigation.navigate("CreateForum");
  }

  function handleDiscoverForumClick() {
    navigation.replace("ForumHome");
  }

  return (
    <Container>
      <RoundDarkButton onPress={handleDiscoverForumClick}>
        <DarkButtonText> Discover New Forums </DarkButtonText>
      </RoundDarkButton>
      <ForumHomeTitle>Followed Forums</ForumHomeTitle>
      <ForumList data={data} />
      <CreateForumButton onPress={handleCreateForumClick}>
        <CreateForumText> Create Your Own Forum</CreateForumText>
      </CreateForumButton>
    </Container>
  );
};

export default FollowedForumScreen;
