import { useNavigation } from "@react-navigation/native";
import { Button, Platform } from "react-native";
import ForumList from "../../components/Forum/ForumList";
import { useState, useEffect } from "react";
import FetchForumData from "../../services/Forum/FetchForumData";
import styled from "styled-components/native";

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
      <FollowedForumButton onPress={navigateToFollowedForumScreen}>
        <ButtonText> See Forums You Have Followed </ButtonText>
      </FollowedForumButton>
      <Title>Discover forums</Title>
      <ForumList data={data} />
      <CreateForumButton>
        <Button
          title={"Create Your Own Forum"}
          onPress={handleCreateForumClick}
        />
      </CreateForumButton>
    </Container>
  );
};

export default ForumHomeScreen;

const Container = styled.View`
  background-color: darkcyan;
  padding: 5px;
  flex: 1;
`;

const FollowedForumButton = styled.TouchableOpacity`
  align-self: stretch;
  padding: 10px;
  border-radius: 20px;
  margin: 5px;
  background-color: darkblue;
`;

const ButtonText = styled.Text`
  align-self: center;
  font-size: 16px;
  font-weight: 400;
  color: white;
`;

const CreateForumButton = styled.TouchableOpacity`
  margin-top: 5px;
  border-width: 0.3px;
  border-color: black;
`;

const Title = styled.Text`
  color: #bdd0e7;
  font-size: 25px;
  font-weight: bold;
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  text-align: center;
  margin: 10px;
  text-decoration-line: underline;
`;
