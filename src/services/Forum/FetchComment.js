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
          const data = documentSnapshot.data();
          const timestamp = data.timestamp;
          const date = new Date(
            timestamp.seconds * 1000 + timestamp.nanoseconds * 0.000001
          );

          const lastEdited = data.lastEdited;
          const editedDate = lastEdited
            ? new Date(
                lastEdited.seconds * 1000 + timestamp.nanoseconds * 0.000001
              )
            : null;

          comments.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
            timestamp: date,
            lastEdited: editedDate
          });
        });
        onSuccessfulFetch(comments);
      },
      (e) => onError(e)
    );
}
