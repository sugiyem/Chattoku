import { Icon } from "react-native-elements";
import { Alert, Text } from "react-native";
import { firebase } from "../../../services/Firebase/Config";
import { useContext, useEffect, useState } from "react";
import { DeleteComment } from "../../../services/Forum/HandleComment";
import { useNavigation } from "@react-navigation/native";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";
import Warning from "../Warning";
import styled from "styled-components/native";
import overlayContext from "../../../screens/Forum/overlayContext";

const initialUserData = {
  img: "",
  username: "fetching username..."
};

const CommentCard = ({
  content,
  uid,
  forumId,
  postId,
  id,
  timestamp,
  lastEdited,
  isAuthorized
}) => {
  const currentUID = firebase.auth().currentUser.uid;
  const [userData, setUserData] = useState(initialUserData);
  const navigation = useNavigation();
  const setOverlayData = useContext(overlayContext);
  const forumData = navigation.getState().routes[1].params.data;
  const data = navigation.getState().routes[2].params.data;
  const isBanned = data.isBanned;
  const isOwner = data.isOwner;
  const isOwnersPost = forumData.owner === uid;
  const dateText = timestamp
    .toDateString()
    .split(" ")
    .filter((_, index) => index > 0)
    .join(" ");

  const editedText = lastEdited
    ? lastEdited
        .toDateString()
        .split(" ")
        .filter((_, index) => index > 0)
        .join(" ")
    : "";

  //Fetch username of commenter
  useEffect(() => {
    FetchInfoById(uid, (data) => {
      if (data.isDeleted) {
        setUserData({
          ...initialUserData,
          username: "[Deleted Account]",
          isDeleted: true
        });
        return;
      }

      setUserData(data);
    });
  }, []);

  function handleEditPress() {
    navigation.navigate("EditComment", {
      data: {
        content: content,
        forumId: forumId,
        postId: postId,
        commentId: id
      }
    });
  }

  function handleDelete() {
    Warning(async () => {
      await DeleteComment(
        forumId,
        postId,
        id,
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
      <Content> {content} </Content>
      {!!lastEdited && <EditedText> (Last Edited: {editedText})</EditedText>}
      <ActionBar>
        {((!isBanned && currentUID === uid) ||
          isOwner ||
          (isAuthorized && !isOwnersPost)) && (
          <Action onPress={handleDelete}>
            <Icon name="delete" type="material" color="red" />
            <DeleteText> Delete </DeleteText>
          </Action>
        )}
        {!isBanned && currentUID === uid && (
          <Action onPress={handleEditPress}>
            <Icon name="edit" type="material" />
            <Text> Edit </Text>
          </Action>
        )}
      </ActionBar>
    </Container>
  );
};

export default CommentCard;

const Container = styled.View`
  background-color: white;
  margin: 10px;
  padding: 10px;
  border-width: 1px;
  border-color: black;
  border-radius: 10px;
`;

const DateText = styled.Text`
  font-size: 13px;
  margin-left: auto;
`;

const EditedText = styled.Text`
  font-size: 13px;
  padding: 5px;
`;

const Content = styled.Text`
  font-size: 15px;
  padding-top: 10px;
  max-height: 100px;
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

const Profile = styled.Image`
  align-self: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: white;
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

const DeleteText = styled.Text`
  color: red;
`;
