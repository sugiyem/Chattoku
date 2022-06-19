import { Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

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
      />
      <ForumDetails>
        <Logo
          source={
            img !== ""
              ? { uri: img }
              : require("../../assets/default-profile.png")
          }
        />
        <Title>{title}</Title>
        <CustomButton onPress={goToForum}>
          <Text>Press Here To Continue to Forum</Text>
        </CustomButton>
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
  border-radius: 10px;
  border-color: blue;
  border-width: 1px;
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

const CustomButton = styled.TouchableOpacity`
  align-self: stretch;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  border-width: 1px;
  background-color: aquamarine;
  align-items: center;
`;
