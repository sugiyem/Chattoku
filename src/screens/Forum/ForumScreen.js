import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import PostList from "../../components/Forum/ForumPost/PostList";
import { firebase } from "../../services/Firebase/Config";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { isUserBanned } from "../../services/Forum/HandleBannedUsers";
import FetchPost from "../../services/Forum/FetchPost";

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
  const [isBanned, setIsBanned] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const data = navigation.getState().routes[1].params.data;
  const currentUID = firebase.auth().currentUser.uid;
  const isOwner = data.owner === currentUID;

  console.log(data);

  function handleAddButtonClick() {
    navigation.navigate("AddPost", { data: data });
  }

  function handleEditForumButton() {
    navigation.navigate("ManageForum", { data: data });
  }

  console.log(posts);

  //Check for ban
  useEffect(() => {
    if (!isFocused) return;

    isUserBanned(data.id, currentUID, (result) => setIsBanned(result.isFound));
  }, [isFocused]);

  //retrieve posts
  useEffect(() => {
    if (!isFocused) return;

    return FetchPost(
      data.id,
      (data) => setPosts(data),
      (error) => Alert.alert(error)
    );
  }, [isFocused]);

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
      {/* <Header {...data} /> */}
      <PostList
        forumId={data.id}
        isOwner={isOwner}
        isBanned={isBanned}
        Header={() => <Header {...data} />}
        posts={posts}
      />
      {isBanned ? (
        <BannedText>You have been banned</BannedText>
      ) : (
        <Icon
          name="add"
          type="material"
          style={styles.add}
          size={50}
          onPress={handleAddButtonClick}
        />
      )}
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
