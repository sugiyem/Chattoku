import { Card, Icon } from "react-native-elements";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { firebase } from "../../../firebase/Config";
import { useEffect, useState } from "react";
import { DeleteComment } from "./HandleComment";
import { useNavigation } from "@react-navigation/native";

const CommentCard = ({ content, uid, forumId, postId, id }) => {
  const currentUID = firebase.auth().currentUser.uid;
  const [username, setUsername] = useState("fetching username...");
  const navigation = useNavigation();

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

  return (
    <Card style={styles.container}>
      <Text> User: {username}</Text>
      <Card.Divider />
      <Text> {content} </Text>
      <View style={styles.actionBar}>
        {currentUID === uid && (
          <>
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
            <TouchableOpacity style={styles.action} onPress={handleEditPress}>
              <Icon name="edit" type="material" />
              <Text> Edit </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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
  actionBar: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-evenly"
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
