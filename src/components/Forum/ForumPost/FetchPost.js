import { firebase } from "../../../firebase/Config";

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
          posts.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
        onSuccessfulFetch(posts);
      },
      (error) => onError(error)
    );
}
