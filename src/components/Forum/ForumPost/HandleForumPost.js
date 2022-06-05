import { Alert } from "react-native";
import { firebase } from "../../../firebase/Config";
import Warning from "../Warning";

export async function addPost(forumId, post, onSuccess, onError) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .add({ ...post, uid: currentUID })
    .then(() => onSuccess())
    .catch((e) => onError(e));
}

export async function deletePost(forumId, postId, onSuccess, onError) {
  console.log("run");
  Warning(async () => {
    const batch = firebase.firestore().batch();
    const mainPost = await firebase
      .firestore()
      .collection("forums")
      .doc(forumId)
      .collection("posts")
      .doc(postId)
      .get();

    const snapshots = await firebase
      .firestore()
      .collection("forums")
      .doc(forumId)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .get();

    batch.delete(mainPost.ref);

    snapshots.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    batch.commit();
    onSuccess();
    // )
    //   .then(() => {
    //     batch.commit().catch((e) => console.error(e));
    //     onSuccess();
    //   })
    //   .catch((e) => console.error(e)); //onError(e));
  });
}

export async function editPost(forumId, postId, post, onSuccess, onError) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .update(post)
    .then(onSuccess)
    .catch((e) => onError(e));
}
