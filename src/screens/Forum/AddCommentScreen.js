import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, StyleSheet, Text, View, Alert } from "react-native";
import { Button, Card } from "react-native-elements";
import { firebase } from "../../firebase/Config";
import { AddComment } from "../../components/Forum/ForumComment/HandleComment";

const MainPost = ({ title, content, uid }) => {
  const [username, setUsername] = useState("fetching username...");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => setUsername(snapshot.data().username));
  }, []);

  return (
    <Card style={styles.container}>
      <Text> User: {username}</Text>
      <Card.Title style={styles.header}>{title}</Card.Title>
      <Text> {content} </Text>
    </Card>
  );
};

const AddCommentScreen = () => {
  const navigation = useNavigation();
  const [data, _] = useState(navigation.getState().routes[2].params.data);
  const [comment, setComment] = useState("");

  return (
    <View style={styles.container}>
      <MainPost {...data} />
      <TextInput
        multiline={true}
        style={styles.input}
        placeholder="write your comment..."
        onChangeText={(t) => setComment(t)}
      />
      <Button
        title="Post Comment"
        onPress={() =>
          AddComment(
            data.forumId,
            data.postId,
            comment,
            () => navigation.navigate("Post", { data: data }),
            () => {}
          )
        }
      />
    </View>
  );
};

export default AddCommentScreen;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  title: {
    fontSize: 16,
    textAlign: "center"
  },
  container: {
    backgroundColor: "aquamarine",
    flex: 1,
    padding: 20
  },
  input: {
    height: 200,
    backgroundColor: "whitesmoke",
    borderColor: "black",
    borderWidth: 0.5,
    padding: 10,
    textAlignVertical: "top",
    margin: 20
  }
});
