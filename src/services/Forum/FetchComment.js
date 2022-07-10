import { firebase } from "../Firebase/Config";

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
          const timestamp = documentSnapshot.data().timestamp;
          const date = new Date(
            timestamp.seconds * 1000 + timestamp.nanoseconds * 0.000001
          );

          comments.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
            timestamp: date
          });
        });
        onSuccessfulFetch(comments);
      },
      (e) => onError(e)
    );
}
