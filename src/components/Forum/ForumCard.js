import { Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { AquaButton, AquaButtonText } from "../../styles/ForumStyles";

const ForumCard = ({ forumData }) => {
  const navigation = useNavigation();
  const img = forumData.img;
  const banner = forumData.banner;
  const title = forumData.title;

  function goToForum() {
    navigation.navigate("Forum", {
      data: forumData
    });
  }

  return (
    <Container>
      <Banner
        source={
          banner !== ""
            ? { uri: banner }
            : require("../../assets/default-banner.png")
        }
        testID="banner"
      />
      <ForumDetails>
        <Logo
          source={
            img !== ""
              ? { uri: img }
              : require("../../assets/default-profile.png")
          }
          testID="logo"
        />
        <Title testID="title">{title}</Title>
        <AquaButton onPress={goToForum} testID="continueButton">
          <AquaButtonText>Press Here To Continue to Forum</AquaButtonText>
        </AquaButton>
      </ForumDetails>
    </Container>
  );
};

export default ForumCard;

const width = Dimensions.get("screen").width;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${width - 18}px;
  background-color: white;
  border-radius: 15px;
  border-color: blue;
  border-width: 1px;
  overflow: hidden;
  margin: 5px;
`;

const Banner = styled.Image`
  width: ${width - 20}px;
  height: ${(width * 2) / 5 - 8}px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
`;

const ForumDetails = styled.View`
  width: 100%;
  padding: 10px;
  padding-top: 50px;
  align-items: center;
`;

const Logo = styled.Image`
  position: absolute;
  align-self: center;
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border-width: 1px;
  border-color: white;
  top: -50px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 400;
`;
