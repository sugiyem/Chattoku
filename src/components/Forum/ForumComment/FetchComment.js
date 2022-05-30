import { firebase } from "../../../firebase/Config";

export default function FetchComment(
  forumId,
  postId,
  onSuccessfulFetch,
  onError
) {
  return firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .onSnapshot(
      async (querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((documentSnapshot) => {
          comments.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id
          });
        });
        onSuccessfulFetch(comments);
      },
      (e) => onError(e)
    );
}
