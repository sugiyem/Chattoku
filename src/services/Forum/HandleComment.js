import { firebase } from "../Firebase/Config";

export async function AddComment(forumId, postId, comment, onSuccess, onError) {
  const currentUID = firebase.auth().currentUser.uid;
  const time = firebase.firestore.FieldValue.serverTimestamp();

  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .add({ content: comment, uid: currentUID, timestamp: time })
    .then(() => onSuccess())
    .catch((e) => onError(e));
}

export async function DeleteComment(
  forumId,
  postId,
  commentId,
  onSuccess,
  onError
) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .doc(commentId)
    .delete()
    .then(() => onSuccess())
    .catch((e) => onError(e));
}

export async function EditComment(
  forumId,
  postId,
  commentId,
  comment,
  onSuccess,
  onError
) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .doc(commentId)
    .update({ content: comment })
    .then(() => onSuccess())
    .catch((e) => onError(e));
}
