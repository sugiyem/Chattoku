import { firebase } from "../../../firebase/Config";

export default function FetchComment(
  forumId,
  postId,
  onSuccessfulFetch,
  onError
) {
  const comments = [];

  firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        comments.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
      });
      onSuccessfulFetch(comments);
    })
    .catch((e) => onError(e));
}
