import { firebase } from "../Firebase/Config";

export default function FetchPost(forumId, onSuccessfulFetch, onError) {
  return firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .onSnapshot(
      (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((documentSnapshot) => {
          const timestamp = documentSnapshot.data().timestamp;
          const date = new Date(
            timestamp.seconds * 1000 + timestamp.nanoseconds * 0.000001
          );

          posts.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
            timestamp: date
          });
        });
        onSuccessfulFetch(posts);
      },
      (error) => onError(error)
    );
}
