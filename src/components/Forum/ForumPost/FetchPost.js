import { firebase } from "../../../firebase/Config";

export default function FetchPost(forumId, onSuccessfulFetch, onError) {
  const posts = [];

  firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        posts.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
      });
      onSuccessfulFetch(posts);
    })
    .catch((e) => onError(e));
}
