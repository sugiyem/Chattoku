import { Card, Icon } from "react-native-elements";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { firebase } from "../../../services/Firebase/Config";
import { useEffect, useState } from "react";
import { DeleteComment } from "./HandleComment";

const CommentCard = ({ content, uid, forumId, postId, id }) => {
  const currentUID = firebase.auth().currentUser.uid;
  const [username, setUsername] = useState("fetching username...");

  console.log(uid);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
        setUsername(snapshot.data().username);
      });
  }, []);

  return (
    <Card style={styles.container}>
      <Text> User: {username}</Text>
      <Card.Divider />
      <Text> {content} </Text>
      {currentUID === uid && (
        <TouchableOpacity
          style={styles.action}
          onPress={() =>
            DeleteComment(
              forumId,
              postId,
              id,
              () => {},
              (e) => Alert.alert(e)
            )
          }
        >
          <Icon name="delete" type="material" color="red" />
          <Text style={styles.delete}> Delete </Text>
        </TouchableOpacity>
      )}
    </Card>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontSize: 16
  },
  action: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    margin: 10
  },
  delete: {
    color: "red"
  }
});
