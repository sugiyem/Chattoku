import { firebase } from "../../../firebase/Config";

export function addPost(forumId, post, onSuccess, onError) {
  const currentUID = firebase.auth().currentUser.uid;

  firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .add({ ...post, uid: currentUID })
    .then(() => onSuccess())
    .catch((e) => onError());
}

export function deletePost(forumId, postId, onSuccess, onError) {}
