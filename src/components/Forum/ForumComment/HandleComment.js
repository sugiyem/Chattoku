import { firebase } from "../../../firebase/Config";

export function AddComment(forumId, postId, comment, onSuccess, onError) {
  const currentUID = firebase.auth().currentUser.uid;

  firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .add({ content: comment, uid: currentUID })
    .then(() => onSuccess())
    .catch((e) => onError());
}
