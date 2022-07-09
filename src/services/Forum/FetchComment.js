import { firebase } from "../Firebase/Config";

export default function FetchComment(
  forumId,
  postId,
  onSuccessfulFetch,
  onError,
  app = firebase
) {
  return app
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
