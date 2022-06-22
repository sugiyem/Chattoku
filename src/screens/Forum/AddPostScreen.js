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
import { addPost } from "../../services/Forum/HandleForumPost";

const initialState = {
  title: "",
  content: ""
};

const AddPostScreen = () => {
  const navigation = useNavigation();
  const [data, _] = useState(navigation.getState().routes[1].params.data);
  const [post, setPost] = useState(initialState);

  function handleChange(text, name) {
    setPost({
      ...post,
      [name]: text
    });
  }

  console.log(post);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}> Post to {data.title} </Text>
      <View style={styles.inputContainer}>
        <Text> Title </Text>
        <TextInput
          style={styles.inputTitle}
          placeholder="title"
          onChangeText={(t) => handleChange(t, "title")}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text> Content</Text>
        <TextInput
          multiline={true}
          style={styles.content}
          placeholder="content"
          onChangeText={(t) => handleChange(t, "content")}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addPost(
            data.id,
            post,
            () => navigation.navigate("Forum", { data: data }),
            (e) => Alert.alert(e)
          );
        }}
      >
        <Text style={styles.buttonText}>Post To Forum</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPostScreen;

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
