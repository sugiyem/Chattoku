import { useEffect, useState } from "react";
import PastPostList from "../../components/Profile/PastPostList";
import { FetchPreviousPosts } from "../../services/Forum/FetchPreviousPosts";
import styled from "styled-components/native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Container } from "../../styles/GeneralStyles";

const PastPostsScreen = () => {
  const [postData, setPostsData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  console.log(postData);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    return FetchPreviousPosts(setPostsData);
  }, [isFocused]);

  function handleBackButtonClick() {
    navigation.goBack();
  }

  return (
    <Container>
      <Button onPress={handleBackButtonClick}>
        <ButtonText> Go Back</ButtonText>
      </Button>
      <Title> Your Previous Posts </Title>
      <PastPostList postsData={postData} Header={() => <></>} />
    </Container>
  );
};

export default PastPostsScreen;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 300;
  padding: 10px;
  align-self: center;
  color: whitesmoke;
  text-decoration-line: underline;
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
