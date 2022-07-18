import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import styled from "styled-components/native";

const PastPostCard = ({ forumData, postData }) => {
  const navigation = useNavigation();

  function navigateToForum() {
    navigation.navigate("Forum", { data: forumData });
  }

  console.log(forumData);
  console.log(postData);

  const dateText = postData.timestamp
    .toDateString()
    .split(" ")
    .filter((_, index) => index > 0)
    .join(" ");

  const editedText = postData.lastEdited
    ? postData.lastEdited
        .toDateString()
        .split(" ")
        .filter((_, index) => index > 0)
        .join(" ")
    : "";

  function navigateToPost() {
    navigation.navigate("Forum", { data: forumData });
    navigation.navigate("Post", {
      data: { ...postData, timestamp: dateText, lastEdited: editedText }
    });
  }

  return (
    <Container>
      <ForumInfo>
        <Profile
          source={
            forumData.img !== ""
              ? { uri: forumData.img }
              : require("../../assets/default-profile.png")
          }
        />
        <ForumName> {forumData.title}</ForumName>
        <DateText> {dateText} </DateText>
      </ForumInfo>
      <Title>{postData.title}</Title>
      <Content> {postData.content} </Content>
      {!!editedText && <EditedText>(Last Edited: {editedText})</EditedText>}
      <ButtonContainer>
        <CustomButton onPress={navigateToPost}>
          <Text> See Full Post </Text>
        </CustomButton>
        <CustomButton onPress={navigateToForum}>
          <Text>Go To Forum</Text>
        </CustomButton>
      </ButtonContainer>
    </Container>
  );
};

export default PastPostCard;

const Profile = styled.Image`
  align-self: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border-width: 1px;
  border-color: white;
`;

const Container = styled.View`
  background-color: white;
  margin: 10px;
  border-width: 1px;
  border-color: black;
  border-radius: 10px;
  overflow: hidden;
`;

const ForumName = styled.Text`
  font-size: 17px;
  font-weight: 400;
  margin-left: 5px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
  align-self: center;
`;

const DateText = styled.Text`
  font-size: 13px;
  margin-left: auto;
`;

const EditedText = styled.Text`
  font-size: 13px;
  padding: 5px;
`;

const ForumInfo = styled.View`
  font-size: 16px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: cyan;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const Content = styled.Text`
  overflow: hidden;
  padding: 5px;
  max-height: 100px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const CustomButton = styled.TouchableOpacity`
  flex: 1;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  border-width: 1px;
  background-color: aquamarine;
  align-items: center;
`;
