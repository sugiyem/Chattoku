import { firebase } from "../../../firebase/Config";
import { Alert } from "react-native";
import Warning from "../Warning";

export function addPost(forumId, post, onSuccess, onError) {
  const currentUID = firebase.auth().currentUser.uid;

  firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .add({ ...post, uid: currentUID })
    .then(() => onSuccess())
    .catch((e) => onError());
}

export function deletePost(forumId, postId, onSuccess, onError) {
  Warning(() => {
    firebase
      .firestore()
      .collection("forums")
      .doc(forumId)
      .collection("posts")
      .doc(postId)
      .delete()
      .then(() => onSuccess())
      .catch((e) => onError());
  });
}
