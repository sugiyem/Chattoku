import { Icon } from "react-native-elements";
import { Alert, Text } from "react-native";
import { firebase } from "../../../services/Firebase/Config";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { deletePost } from "../../../services/Forum/HandleForumPost";
import LikeBar from "./LikeBar";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";
import Warning from "../Warning";
import styled from "styled-components/native";

const initialUserData = {
  img: "",
  username: "fetching username..."
};

const PostCard = ({
  title,
  content,
  id,
  uid,
  forumId,
  isOwner,
  isBanned,
  isAuthorized
}) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(initialUserData);
  const currentUID = firebase.auth().currentUser.uid;
  const forumData = navigation.getState().routes[1].params.data;
  const isOwnersPost = forumData.owner === uid;

  const likeBarState = {
    forumId: forumId,
    postId: id
  };

  // console.log(currentUID);
  const postData = {
    title: title,
    content: content,
    postId: id,
    forumId: forumId,
    uid: uid
  };

  //Fetch username of poster
  useEffect(() => {
    FetchInfoById(uid, setUserData);
  }, []);

  function handleCommentPress() {
    navigation.navigate("Post", {
      data: { ...postData, isOwner: isOwner, isBanned: isBanned }
    });
  }

  function handleEditPress() {
    navigation.navigate("EditPost", {
      data: { ...postData, isOwner: isOwner }
    });
  }

  function handleDelete() {
    Warning(async () => {
      await deletePost(
        forumId,
        id,
        uid,
        () => {},
        (e) => Alert.alert(e)
      );
    });
  }

  return (
    <Container>
      <UserInfo>
        <Profile
          source={
            userData.img !== ""
              ? { uri: userData.img }
              : require("../../../assets/default-profile.png")
          }
        />
        <Text> {userData.username}</Text>
      </UserInfo>
      <Title>{title}</Title>
      <Content> {content} </Content>
      <ActionBar>
        <LikeBar {...likeBarState} />
        <Action onPress={handleCommentPress}>
          <Icon name="comment" type="material" color="blue" />
        </Action>
        {((!isBanned && currentUID === uid) ||
          isOwner ||
          (isAuthorized && !isOwnersPost)) && (
          <Action onPress={handleDelete}>
            <Icon name="delete" type="material" color="red" />
          </Action>
        )}
        {!isBanned && currentUID === uid && (
          <Action onPress={handleEditPress}>
            <Icon name="edit" type="material" />
          </Action>
        )}
      </ActionBar>
    </Container>
  );
};

export default PostCard;

const Profile = styled.Image`
  align-self: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: white;
`;

const Container = styled.View`
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
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  max-height: 100px;
`;

const ActionBar = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 10px;
  justify-content: space-evenly;
`;

const Action = styled.TouchableOpacity`
  flex-direction: row;
`;
