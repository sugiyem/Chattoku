import { Card, Icon } from "react-native-elements";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { firebase } from "../../../firebase/Config";
import { useEffect, useState } from "react";

const PostCard = ({ title, content, uid }) => {
  const [username, setUsername] = useState("");

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
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Text> {content} </Text>
      <Card.Divider />
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.action}>
          <Icon name="comment" type="material" />
          <Text> comment</Text>
        </TouchableOpacity>
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
    marginTop: 10
  },
  action: {
    display: "flex",
    flexDirection: "row"
  }
});
