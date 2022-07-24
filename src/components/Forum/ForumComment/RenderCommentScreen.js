import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { EditComment, AddComment } from "../../../services/Forum/HandleComment";
import { renderType } from "../../../constants/Forum";
import {
  ForumNavigation,
  NavigationText,
  ScrollContainer
} from "../../../styles/ForumStyles";
import MainPostCard from "../ForumPost/MainPostCard";
import styled from "styled-components/native";

const RenderCommentScreen = ({ renderScreenType }) => {
  const navigation = useNavigation();
  let commentData;

  //Because this only exists for renderType.EDIT
  if (renderScreenType === renderType.EDIT) {
    commentData = navigation.getState().routes[3].params.data;
  }

  const initialComment =
    renderScreenType === renderType.EDIT ? commentData.content : "";
  const postData = navigation.getState().routes[2].params.data;
  const [comment, setComment] = useState(initialComment);
  const submitButtonText =
    renderScreenType === renderType.EDIT ? "Edit Comment" : "Post Comment";
  const inputPlaceholder =
    renderScreenType === renderType.EDIT
      ? "Edit Your Comment..."
      : "Add Comment...";

  function handleSubmit() {
    if (!comment) {
      Alert.alert("Invalid Comment", "Comment Can Not Be Empty");
      return;
    }

    renderScreenType === renderType.EDIT
      ? EditComment(
          commentData.forumId,
          commentData.postId,
          commentData.commentId,
          comment,
          () => navigation.navigate("Post", { data: postData }),
          (e) => Alert.alert(e)
        )
      : AddComment(
          postData.forumId,
          postData.postId,
          comment,
          () => navigation.navigate("Post", { data: postData }),
          (e) => Alert.alert(e)
        );
  }

  return (
    <ScrollContainer>
      <ForumNavigation onPress={() => navigation.goBack()} testID="goBack">
        <NavigationText>Go Back</NavigationText>
      </ForumNavigation>

      <MainPostCard {...postData} isEditing={true} />

      <CommentInput
        multiline={true}
        placeholder={inputPlaceholder}
        onChangeText={(t) => setComment(t)}
        value={comment}
        testID="input"
      />

      <SubmitButton onPress={handleSubmit} testID="submit">
        <SubmitText>{submitButtonText}</SubmitText>
      </SubmitButton>
    </ScrollContainer>
  );
};

export default RenderCommentScreen;

const CommentInput = styled.TextInput`
  height: 300px;
  background-color: whitesmoke;
  border-radius: 10px;
  border-color: black;
  border-width: 0.5px;
  padding: 10px;
  text-align-vertical: top;
  margin: 20px;
`;

const SubmitButton = styled.TouchableOpacity`
  padding: 10px;
  margin: 12px;
  align-self: stretch;
  border-radius: 5px;
  border-width: 1px;
  border-color: navy;
  background-color: #44d0fe;
`;

const SubmitText = styled.Text`
  text-align: center;
  color: navy;
  font-size: 18px;
`;
