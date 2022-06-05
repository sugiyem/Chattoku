import { firebase } from "../../../firebase/Config";
import Warning from "../Warning";

export async function AddComment(forumId, postId, comment, onSuccess, onError) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .add({ content: comment, uid: currentUID })
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
  Warning(
    async () =>
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
        .catch((e) => onError(e))
  );
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
    .set({ content: comment, uid: currentUID })
    .then(() => onSuccess())
    .catch((e) => onError(e));
}
