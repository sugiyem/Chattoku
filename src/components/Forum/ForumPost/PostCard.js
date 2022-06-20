import { Card, Icon } from "react-native-elements";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { firebase } from "../../../services/Firebase/Config";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { deletePost } from "./HandleForumPost";
import LikeBar from "./LikeBar";

const PostCard = ({ title, content, id, uid, forumId, isOwner, isBanned }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("fetching username...");
  const currentUID = firebase.auth().currentUser.uid;

  const likeBarState = {
    forumId: forumId,
    postId: id
  };

  // console.log(currentUID);
  const postData = {
    title: title,
    content: content,
    postId: id,
    forumId: forumId,
    uid: uid
  };

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
      data: { ...postData, isOwner: isOwner, isBanned: isBanned }
    });
  }

  function handleEditPress() {
    navigation.navigate("EditPost", {
      data: { ...postData, isOwner: isOwner }
    });
  }

  return (
    <Card style={styles.container}>
      <Text> User: {username}</Text>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Text> {content} </Text>
      <Card.Divider />
      <View style={styles.actionBar}>
        <LikeBar {...likeBarState} />
        <TouchableOpacity style={styles.action} onPress={handleCommentPress}>
          <Icon name="comment" type="material" color="blue" />
        </TouchableOpacity>
        {((!isBanned && currentUID === uid) || isOwner) && (
          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              deletePost(
                forumId,
                id,
                () => {},
                (e) => Alert.alert(e)
              )
            }
          >
            <Icon name="delete" type="material" color="red" />
          </TouchableOpacity>
        )}
        {!isBanned && currentUID === uid && (
          <TouchableOpacity style={styles.action} onPress={handleEditPress}>
            <Icon name="edit" type="material" />
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
    fontSize: 16,
    marginTop: 10
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
