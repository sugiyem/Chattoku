import { firebase } from "../../../firebase/Config";
import Warning from "../Warning";

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

export function DeleteComment(forumId, postId, commentId, onSuccess, onError) {
  Warning(() =>
    firebase
      .firestore()
      .collection("forums")
      .doc(forumId)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .delete()
      .then(() => onSuccess())
      .catch((e) => onError())
  );
}
