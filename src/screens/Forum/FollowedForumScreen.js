import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import ForumList from "../../components/Forum/ForumList";
import { useState, useEffect } from "react";
import { firebase } from "../../services/Firebase/Config";
import FetchFollowedForumsData from "../../services/Forum/FetchFollowedForumData";
import styled from "styled-components/native";

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
      <DiscoverForumButton onPress={handleDiscoverForumClick}>
        <ButtonText> Discover New Forums </ButtonText>
      </DiscoverForumButton>
      <Title>Followed Forums</Title>
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

export default FollowedForumScreen;

const Container = styled.View`
  background-color: darkcyan;
  padding: 5px;
  flex: 1;
`;

const CreateForumButton = styled.TouchableOpacity`
  margin-top: 5px;
  border-width: 0.3px;
  border-color: black;
`;

const DiscoverForumButton = styled.TouchableOpacity`
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

const Title = styled.Text`
  color: #bdd0e7;
  font-size: 25px;
  font-weight: bold;
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  text-align: center;
  margin: 10px;
  text-decoration-line: underline;
`;
