import { Card } from "react-native-elements";
import { StyleSheet, Text } from "react-native";
import { firebase } from "../../../firebase/Config";
import { useEffect, useState } from "react";

const CommentCard = ({ content, uid, forumdId, commentId, id }) => {
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
  }
});
