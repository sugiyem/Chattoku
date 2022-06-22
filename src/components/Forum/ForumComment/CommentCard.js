import { Card, Icon } from "react-native-elements";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { firebase } from "../../../services/Firebase/Config";
import { useEffect, useState } from "react";
import { DeleteComment } from "../../../services/Forum/HandleComment";
import { useNavigation } from "@react-navigation/native";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";

const CommentCard = ({ content, uid, forumId, postId, id }) => {
  const currentUID = firebase.auth().currentUser.uid;
  const [username, setUsername] = useState("fetching username...");
  const navigation = useNavigation();
  const data = navigation.getState().routes[2].params.data;
  const isBanned = data.isBanned;
  const isOwner = data.isOwner;

  console.log(uid);

  //Fetch username of commenter
  useEffect(() => {
    FetchInfoById(uid, (userData) => setUsername(userData.username));
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
        {((!isBanned && currentUID === uid) || isOwner) && (
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
        {!isBanned && currentUID === uid && (
          <TouchableOpacity style={styles.action} onPress={handleEditPress}>
            <Icon name="edit" type="material" />
            <Text> Edit </Text>
          </TouchableOpacity>
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
