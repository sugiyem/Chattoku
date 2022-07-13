import { firebase } from "../Firebase/Config";

export async function AddComment(
  forumId,
  postId,
  comment,
  onSuccess,
  onError,
  app = firebase
) {
  const currentUID = app.auth().currentUser.uid;
  const time = new Date();

  await app
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
  onError,
  app = firebase
) {
  await app
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
  onError,
  app = firebase
) {
  const time = new Date();

  await app
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .doc(commentId)
    .update({ content: comment, lastEdited: time })
    .then(() => onSuccess())
    .catch((e) => onError(e));
}
