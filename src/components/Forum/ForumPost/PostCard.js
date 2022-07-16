import { Icon } from "react-native-elements";
import { Alert, Text } from "react-native";
import { firebase } from "../../../services/Firebase/Config";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { deletePost } from "../../../services/Forum/HandleForumPost";
import LikeBar from "./LikeBar";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";
import Warning from "../Warning";
import styled from "styled-components/native";
import overlayContext from "../../../screens/Forum/overlayContext";

const initialUserData = {
  img: "",
  username: "fetching username..."
};

const PostCard = ({ postData, forumId, isOwner, isBanned, isAuthorized }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(initialUserData);
  const currentUID = firebase.auth().currentUser.uid;
  const forumData = navigation.getState().routes[1].params.data;
  const setOverlayData = useContext(overlayContext);
  const isOwnersPost = forumData.owner === postData.uid;

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

  const passedPostState = {
    title: postData.title,
    content: postData.content,
    postId: postData.id,
    forumId: forumId,
    uid: postData.uid,
    img: postData.img
  };

  const likeBarState = {
    forumId: forumId,
    postId: postData.id
  };

  //Fetch username of poster
  useEffect(() => {
    FetchInfoById(postData.uid, setUserData);
  }, []);

  function handleCommentPress() {
    navigation.navigate("Post", {
      data: {
        ...passedPostState,
        isOwner: isOwner,
        isBanned: isBanned,
        timestamp: dateText,
        lastEdited: editedText
      }
    });
  }

  function handleEditPress() {
    navigation.navigate("EditPost", {
      data: { ...passedPostState, isOwner: isOwner }
    });
  }

  function handleDelete() {
    Warning(async () => {
      await deletePost(
        forumId,
        postData.id,
        postData.uid,
        () => {},
        (e) => Alert.alert(e)
      );
    });
  }

  return (
    <Container>
      <UserInfo onPress={() => setOverlayData(userData)}>
        <Profile
          source={
            userData.img !== ""
              ? { uri: userData.img }
              : require("../../../assets/default-profile.png")
          }
        />
        <Text> {userData.username}</Text>
        <DateText> {dateText} </DateText>
      </UserInfo>
      <Divider />
      <Title>{postData.title}</Title>
      <Content> {postData.content} </Content>
      {!!editedText && <EditedText> (Last Edited: {editedText})</EditedText>}
      <ActionBar>
        <LikeBar {...likeBarState} />
        <Action onPress={handleCommentPress}>
          <Icon name="comment" type="material" color="blue" />
        </Action>
        {((!isBanned && currentUID === postData.uid) ||
          isOwner ||
          (isAuthorized && !isOwnersPost)) && (
          <Action onPress={handleDelete}>
            <Icon name="delete" type="material" color="red" />
          </Action>
        )}
        {!isBanned && currentUID === postData.uid && (
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

const DateText = styled.Text`
  font-size: 13px;
  margin-left: auto;
`;

const EditedText = styled.Text`
  font-size: 13px;
  padding: 5px;
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

const UserInfo = styled.TouchableOpacity`
  font-size: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Divider = styled.View`
  height: 0.6px;
  background-color: black;
  margin-top: 4px;
`;

const Content = styled.Text`
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  max-height: 100px;
`;

const ActionBar = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-evenly;
`;

const Action = styled.TouchableOpacity`
  flex-direction: row;
`;
