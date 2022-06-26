import { useNavigation } from "@react-navigation/native";
import { Text, LogBox } from "react-native";
import { useState, useEffect } from "react";
import CommentList from "../../components/Forum/ForumComment/CommentList";
import LikeBar from "../../components/Forum/ForumPost/LikeBar";
import styled from "styled-components/native";
import { FetchInfoById } from "../../services/Profile/FetchUserInfo";

const initialUserData = {
  img: "",
  username: "fetching username..."
};

//Temporarily disable log (Because I don't know the cause of the warning)
LogBox.ignoreAllLogs();

const MainPost = ({ title, content, uid, forumId, postId }) => {
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    FetchInfoById(uid, setUserData);
  }, []);

  return (
    <HeaderContainer>
      <UserInfo>
        <Profile
          source={
            userData.img !== ""
              ? { uri: userData.img }
              : require("../../assets/default-profile.png")
          }
        />
        <Text> {userData.username}</Text>
      </UserInfo>
      <Title>{title}</Title>
      <Content> {content} </Content>
      <LikeBar forumId={forumId} postId={postId} />
    </HeaderContainer>
  );
};

const ForumPostScreen = () => {
  const navigation = useNavigation();
  const [data] = useState(navigation.getState().routes[2].params.data);
  console.log(data);

  function handleAddButtonClick() {
    navigation.navigate("AddComment", { data: data });
  }

  function renderHeader() {
    return (
      <>
        <MainPost {...data} />

        <TextContainer>
          <StyledText> Comments </StyledText>
        </TextContainer>
      </>
    );
  }

  return (
    <Container>
      <Button onPress={() => navigation.goBack()}>
        <ButtonText>Go Back</ButtonText>
      </Button>

      <CommentList {...data} Header={renderHeader} />

      {data.isBanned ? (
        <BannedText>You have been banned</BannedText>
      ) : (
        <Button onPress={handleAddButtonClick}>
          <ButtonText>Add Your Comment</ButtonText>
        </Button>
      )}
    </Container>
  );
};

export default ForumPostScreen;

const Container = styled.View`
  padding: 5px;
  flex: 1;
  background-color: darkcyan;
`;

const Button = styled.TouchableOpacity`
  align-self: stretch;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  border-width: 1px;
  background-color: aquamarine;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: blue;
`;

const BannedText = styled.Text`
  border-radius: 10px;
  padding: 10px;
  background-color: navy;
  margin: 20px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

const Profile = styled.Image`
  align-self: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: white;
`;

const HeaderContainer = styled.View`
  background-color: white;
  margin: 10px;
  padding: 10px;
  border-width: 1px;
  border-color: black;
  border-radius: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
  align-self: center;
`;

const UserInfo = styled.View`
  font-size: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Content = styled.Text`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TextContainer = styled.View`
  margin: 5px;
  margin-top: 15px;
  padding: 5px;
  align-self: stretch;
  border-top-width: 1px;
`;

const StyledText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  text-decoration-line: underline;
  color: whitesmoke;
  text-align: center;
`;
