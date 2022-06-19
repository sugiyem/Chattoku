import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import PostList from "../../components/Forum/ForumPost/PostList";
import { firebase } from "../../firebase/Config.js";
import styled from "styled-components/native";

const Header = ({ img, title, banner, desc }) => {
  return (
    <HeaderContainer>
      <Banner
        source={
          banner !== ""
            ? { uri: banner }
            : require("../../assets/default-banner.png")
        }
      />
      <ForumDetails>
        <Title>{title}</Title>
        <Desc> {desc} </Desc>
        <Logo
          source={
            img !== ""
              ? { uri: img }
              : require("../../assets/default-profile.png")
          }
        />
      </ForumDetails>
    </HeaderContainer>
  );
};

const ForumScreen = () => {
  const navigation = useNavigation();
  const data = navigation.getState().routes[1].params.data;
  const currentUID = firebase.auth().currentUser.uid;
  const isOwner = data.owner === currentUID;

  function handleAddButtonClick() {
    navigation.navigate("AddPost", { data: data });
  }

  function handleEditForumButton() {
    navigation.navigate("ManageForum", { data: data });
  }

  return (
    <Container>
      <CustomButton onPress={() => navigation.goBack()}>
        <ButtonText>Go Back</ButtonText>
      </CustomButton>
      {isOwner && (
        <CustomButton onPress={handleEditForumButton}>
          <ButtonText>Manage Your Forum</ButtonText>
        </CustomButton>
      )}
      <Header {...data} />
      <PostList forumId={data.id} isOwner={isOwner} />
      <Icon
        name="add"
        type="material"
        style={styles.add}
        size={50}
        onPress={handleAddButtonClick}
      />
    </Container>
  );
};

export default ForumScreen;

const width = Dimensions.get("screen").width;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${width - 18}px;
  background-color: cyan;
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
`;

const Logo = styled.Image`
  position: absolute;
  height: 80px;
  width: 80px;
  border-radius: 80px;
  border-width: 1px;
  border-color: white;
  top: -70px;
  left: 20px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const Desc = styled.Text`
  font-size: 14px;
`;

const Container = styled.View`
  flex: 1;
  background-color: darkcyan;
  padding: 5px;
`;

const CustomButton = styled.TouchableOpacity`
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

const styles = StyleSheet.create({
  add: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end"
  }
});
