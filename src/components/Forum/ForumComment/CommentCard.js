import { Icon } from "react-native-elements";
import { Alert, Text } from "react-native";
import { firebase } from "../../../services/Firebase/Config";
import { useEffect, useState } from "react";
import { DeleteComment } from "../../../services/Forum/HandleComment";
import { useNavigation } from "@react-navigation/native";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";
import Warning from "../Warning";
import styled from "styled-components/native";

const initialUserData = {
  img: "",
  username: "fetching username..."
};

const CommentCard = ({ content, uid, forumId, postId, id, isAuthorized }) => {
  const currentUID = firebase.auth().currentUser.uid;
  const [userData, setUserData] = useState(initialUserData);
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const data = navigation.getState().routes[2].params.data;
  const isBanned = data.isBanned;
  const isOwner = data.isOwner;
  const isOwnersPost = forumData.owner === uid;

  console.log(uid);

  //Fetch username of commenter
  useEffect(() => {
    FetchInfoById(uid, setUserData);
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
      <Content> {content} </Content>
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

const Content = styled.Text`
  font-size: 15px;
  padding-top: 10px;
  max-height: 100px;
`;

const UserInfo = styled.View`
  font-size: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  flex-direction: row;
  flex: 1;
  margin-top: 10px;
  justify-content: space-evenly;
`;

const Action = styled.TouchableOpacity`
  flex-direction: row;
`;

const DeleteText = styled.Text`
  color: red;
`;
