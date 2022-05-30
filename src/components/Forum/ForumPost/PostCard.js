import { Card, Icon } from "react-native-elements";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { firebase } from "../../../firebase/Config";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { deletePost } from "./HandleForumPost";

const PostCard = ({ title, content, id, uid, forumId, setPosts }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("fetching username...");
  const currentUID = firebase.auth().currentUser.uid;

  console.log(currentUID);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => setUsername(snapshot.data().username));
  }, []);

  function handleCommentPress() {
    navigation.navigate("Post", {
      data: {
        title: title,
        content: content,
        postId: id,
        forumId: forumId,
        uid: uid
      }
    });
  }

  return (
    <Card style={styles.container}>
      <Text> User: {username}</Text>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Text> {content} </Text>
      <Card.Divider />
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.action} onPress={handleCommentPress}>
          <Icon name="comment" type="material" />
          <Text> comment</Text>
        </TouchableOpacity>
        {currentUID === uid && (
          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              deletePost(
                forumId,
                id,
                () => {
                  setPosts((data) => data.filter((post) => post.id !== id));
                },
                () => {}
              )
            }
          >
            <Icon name="delete" type="material" color="red" />
            <Text style={styles.delete}> Delete </Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontSize: 16
  },
  actionBar: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-evenly"
  },
  action: {
    display: "flex",
    flexDirection: "row"
  },
  delete: {
    color: "red"
  }
});
