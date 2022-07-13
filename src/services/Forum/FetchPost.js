import { firebase } from "../Firebase/Config";

export default function FetchPost(
  forumId,
  onSuccessfulFetch,
  onError,
  app = firebase
) {
  return app
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .onSnapshot(
      (querySnapshot) => {
        const posts = [];
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

          posts.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
            timestamp: date,
            lastEdited: editedDate
          });
        });
        console.log(posts);
        onSuccessfulFetch(posts);
      },
      (error) => onError(error)
    );
}
