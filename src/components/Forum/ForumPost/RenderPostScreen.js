import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { Image, Alert, StyleSheet, Dimensions } from "react-native";
import { editPost, addPost } from "../../../services/Forum/HandleForumPost";
import { renderType } from "../../../constants/Forum";
import styled from "styled-components/native";
import {
  pickImageFromLibrary,
  uploadImage
} from "../../../services/Miscellaneous/HandleImage";
import { Icon } from "react-native-elements";
import ImageSlider from "../../Miscellaneous/ImageSlider";

const initialState = {
  title: "",
  content: "",
  img: []
};

const RenderPostScreen = ({ renderScreenType }) => {
  const navigation = useNavigation();
  const isCreateScreen = renderScreenType === renderType.CREATE;
  let postData;

  //This data only exists for EditPostScreen
  if (!isCreateScreen) {
    postData = navigation.getState().routes[2].params.data;
  }

  const initialPostState = isCreateScreen
    ? initialState
    : {
        title: postData.title,
        content: postData.content,
        img: postData.img
      };

  const [imageIndex, setImageIndex] = useState(0);
  const [post, setPost] = useState(initialPostState);
  const ImagesContainerRef = useRef(null);
  const forumData = navigation.getState().routes[1].params.data;
  const isImageUploaded = post.img.length > 0;
  const title = isCreateScreen ? "Create a Post in" : "Edit Your Post in";
  const submitButtonText = isCreateScreen ? "Post To Forum" : "Confirm Edit";

  console.log("Page Index: " + imageIndex);

  function handleChange(text, name) {
    setPost({
      ...post,
      [name]: text
    });
  }

  function handleSubmit() {
    isCreateScreen
      ? addPost(
          forumData.id,
          post,
          forumData.title,
          () => navigation.navigate("Forum", { data: forumData }),
          (e) => Alert.alert(e)
        )
      : editPost(
          postData.forumId,
          postData.postId,
          post,
          () => navigation.navigate("Forum", { data: forumData }),
          (e) => Alert.alert(e)
        );
  }

  function handleAddImage() {
    if (post.img.length === 10) {
      Alert.alert("You Can Only Upload A Maximum Of 10 Images");
      return;
    }

    pickImageFromLibrary((uri) =>
      uploadImage(
        uri,
        () => {},
        () => {},
        (src) => setPost({ ...post, img: [...post.img, src] }),
        "Image Added Successfully"
      )
    );
  }

  function handleDeleteImage() {
    const filteredImg = post.img.filter((_, index) => index !== imageIndex);
    setPost({ ...post, img: filteredImg });
    const newImageIndex = Math.min(imageIndex, filteredImg.length - 1);
    setImageIndex(newImageIndex);
    ImagesContainerRef.current.scrollTo({
      x: newImageIndex * IMAGE_WIDTH,
      y: 0,
      animated: true
    });
  }

  return (
    <Container>
      <Button onPress={() => navigation.goBack()}>
        <ButtonText>Go Back</ButtonText>
      </Button>
      <Title>
        {title} {forumData.title}
      </Title>
      <InputContainer>
        <InputLabel> Title </InputLabel>
        <TitleInput
          placeholder="title"
          onChangeText={(t) => handleChange(t, "title")}
          value={post.title}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel> Content</InputLabel>
        <ContentInput
          multiline={true}
          placeholder="content"
          onChangeText={(t) => handleChange(t, "content")}
          value={post.content}
        />
      </InputContainer>

      {isImageUploaded ? (
        <>
          <ImageSlider
            img={post.img}
            onChangePage={setImageIndex}
            imageRef={ImagesContainerRef}
            state={[imageIndex, setImageIndex]}
          />
          <Button>
            <ButtonText onPress={handleAddImage}>Add Another Image</ButtonText>
          </Button>
          <DeleteButton onPress={handleDeleteImage}>
            <ButtonText> Delete Current Image </ButtonText>
          </DeleteButton>
        </>
      ) : (
        <Button onPress={handleAddImage}>
          <ButtonText>Add an Image </ButtonText>
        </Button>
      )}
      <SubmitButton onPress={handleSubmit}>
        <SubmitText>{submitButtonText}</SubmitText>
      </SubmitButton>
    </Container>
  );
};

export default RenderPostScreen;

const width = Dimensions.get("screen").width;
const IMAGE_WIDTH = width - 80;

const Container = styled.ScrollView`
  display: flex;
  background-color: darkcyan;
  flex: 1;
  padding: 15px;
`;

const Button = styled.TouchableOpacity`
  align-self: stretch;
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  background-color: blue;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: white;
  font-size: 18px;
`;

const SubmitButton = styled.TouchableOpacity`
  align-self: stretch;
  margin: 5px;
  padding: 10px;
  border-radius: 20px;
  background-color: cyan;
`;

const SubmitText = styled.Text`
  text-align: center;
  color: navy;
  font-size: 18px;
`;

const DeleteButton = styled.TouchableOpacity`
  align-self: stretch;
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  background-color: #c10015;
`;

const InputContainer = styled.View`
  margin: 10px;
`;

const InputLabel = styled.Text`
  color: whitesmoke;
  font-size: 18px;
  padding-bottom: 3px;
`;

const Title = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  text-decoration-line: underline;
`;

const TitleInput = styled.TextInput`
  border-color: black;
  padding: 10px;
  border-width: 0.5px;
  background-color: whitesmoke;
`;

const ContentInput = styled.TextInput`
  display: flex;
  height: 200px;
  border-color: black;
  padding: 10px;
  border-width: 0.5px;
  background-color: whitesmoke;
  text-align-vertical: top;
`;
