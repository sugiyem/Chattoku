import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";
import Warning from "../../components/Forum/Warning";
import { likeStatus } from "../../constants/Post";

export async function addPost(forumId, post, onSuccess, onError) {
  const currentUID = firebase.auth().currentUser.uid;

  //Create post
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .add({ ...post, uid: currentUID })
    .then((doc) => {
      //Then add to user history
      firebase
        .firestore()
        .collection("users")
        .doc(currentUID)
        .collection("posts")
        .add({
          postId: doc.id,
          forumId: forumId,
          timestamp: new Date()
        });
      onSuccess();
    })
    .catch((e) => onError(e));
}

export async function deletePost(forumId, postId, onSuccess, onError) {
  console.log("run");
  Warning(async () => {
    const batch = firebase.firestore().batch();
    const postRef = firebase
      .firestore()
      .collection("forums")
      .doc(forumId)
      .collection("posts")
      .doc(postId);

    const commentSnapshots = await postRef.collection("comments").get();
    const likeSnapshots = await postRef.collection("likes").get();
    const dislikeSnapshots = await postRef.collection("dislikes").get();

    batch.delete(postRef);

    commentSnapshots.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    likeSnapshots.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    dislikeSnapshots.docs.forEach((doc) => {
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

export async function getLikeStatus(forumId, postId, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;
  const combinedId = forumId + postId;
  const userRef = firebase.firestore().collection("users").doc(currentUID);
  const isLiked = await userRef
    .collection("likes")
    .doc(combinedId)
    .get()
    .then((doc) => doc.exists);

  const isDisliked = await userRef
    .collection("dislikes")
    .doc(combinedId)
    .get()
    .then((doc) => doc.exists);

  if (isLiked) {
    callbackSuccess(likeStatus.LIKE);
  } else if (isDisliked) {
    callbackSuccess(likeStatus.DISLIKE);
  } else {
    callbackSuccess(likeStatus.NEUTRAL);
  }
}

export async function getNumberOfLikes(forumId, postId, callbackSuccess) {
  const postRef = firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId);

  const likes = (await postRef.collection("likes").get()).size;
  const dislikes = (await postRef.collection("dislikes").get()).size;
  console.log(likes);
  console.log(dislikes);

  callbackSuccess(likes - dislikes);
}

export async function updateLikes(forumId, postId, postLikeStatus) {
  const currentUID = firebase.auth().currentUser.uid;
  const postRef = firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId);
  const likeRef = postRef.collection("likes").doc(currentUID);
  const dislikeRef = postRef.collection("dislikes").doc(currentUID);

  const userRef = firebase.firestore().collection("users").doc(currentUID);
  const userLikeRef = userRef.collection("likes").doc(forumId + postId);
  const userDislikeRef = userRef.collection("dislikes").doc(forumId + postId);
  const batch = firebase.firestore().batch();

  if (postLikeStatus === likeStatus.LIKE) {
    batch.set(likeRef, {});
    batch.delete(dislikeRef);
    batch.set(userLikeRef, {});
    batch.delete(userDislikeRef);
  } else if (postLikeStatus === likeStatus.DISLIKE) {
    batch.set(dislikeRef, {});
    batch.delete(likeRef);
    batch.set(userDislikeRef, {});
    batch.delete(userLikeRef);
  } else {
    batch.delete(dislikeRef);
    batch.delete(likeRef);
    batch.delete(userDislikeRef);
    batch.delete(userLikeRef);
  }

  batch
    .commit()
    .then(() => console.log("update success"))
    .catch((e) => console.error(e));
}
