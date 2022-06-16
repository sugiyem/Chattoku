import { Alert } from "react-native";
import { firebase } from "../../../services/Firebase/Config";
import Warning from "../Warning";

export async function addPost(forumId, post, onSuccess, onError) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .add({ ...post, uid: currentUID })
    .then(() => onSuccess())
    .catch((e) => onError(e));
}

export async function deletePost(forumId, postId, onSuccess, onError) {
  Warning(async () => {
    await firebase
      .firestore()
      .collection("forums")
      .doc(forumId)
      .collection("posts")
      .doc(postId)
      .delete()
      .then(() => onSuccess())
      .catch((e) => onError(e));
  });
}
