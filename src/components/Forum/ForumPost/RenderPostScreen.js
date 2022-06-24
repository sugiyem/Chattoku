import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { editPost, addPost } from "../../../services/Forum/HandleForumPost";
import { renderType } from "../../../constants/Forum";

const initialState = {
  title: "",
  content: ""
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
        content: postData.content
      };

  const [post, setPost] = useState(initialPostState);

  const forumData = navigation.getState().routes[1].params.data;

  const title = isCreateScreen ? "Create a Post in" : "Edit Your Post in";
  const submitButtonText = isCreateScreen ? "Post To Forum" : "Confirm Edit";

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>
        {title} {forumData.title}
      </Text>
      <View style={styles.inputContainer}>
        <Text> Title </Text>
        <TextInput
          style={styles.inputTitle}
          placeholder="title"
          onChangeText={(t) => handleChange(t, "title")}
          value={post.title}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text> Content</Text>
        <TextInput
          multiline={true}
          style={styles.content}
          placeholder="content"
          onChangeText={(t) => handleChange(t, "content")}
          value={post.content}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenderPostScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "darkcyan",
    flex: 1,
    padding: 15
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    textDecorationLine: "underline"
  },
  inputContainer: {
    margin: 10
  },
  inputTitle: {
    borderColor: "black",
    padding: 10,
    borderWidth: 0.5,
    backgroundColor: "whitesmoke"
  },
  content: {
    display: "flex",
    height: 400,
    borderColor: "black",
    padding: 10,
    borderWidth: 0.5,
    backgroundColor: "whitesmoke",
    textAlignVertical: "top"
  },
  button: {
    alignSelf: "stretch",
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "blue"
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18
  }
});
