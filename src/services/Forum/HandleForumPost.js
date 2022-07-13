import { firebase } from "../Firebase/Config";
import { likeStatus } from "../../constants/Post";
import NotifyAllFollowers from "./NotifyAllFollowers";

export async function addPost(
  forumId,
  post,
  forumName,
  onSuccess,
  onError,
  app = firebase
) {
  const currentUID = app.auth().currentUser.uid;
  const time = new Date();
  const db = app.firestore();
  const batch = db.batch();
  const postsRef = db.collection("forums").doc(forumId).collection("posts");
  const newPostID = postsRef.doc().id;

  const userPostsRef = db
    .collection("users")
    .doc(currentUID)
    .collection("posts")
    .doc(forumId + newPostID);

  batch.set(postsRef.doc(newPostID), {
    ...post,
    uid: currentUID,
    timestamp: time
  });
  batch.set(userPostsRef, {
    postId: newPostID,
    forumId: forumId,
    timestamp: time
  });

  //Create post
  await batch
    .commit()
    .then(() => {
      NotifyAllFollowers(forumId, forumName, post.title);
      onSuccess();
    })
    .catch((e) => onError(e));

  return { postID: newPostID, time: time };
}

export async function deletePost(
  forumId,
  postId,
  uid,
  onSuccess,
  onError,
  app = firebase
) {
  console.log("run");
  const db = app.firestore();
  const batch = db.batch();
  const postRef = db
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId);

  const userPostRef = db
    .collection("users")
    .doc(uid)
    .collection("posts")
    .doc(forumId + postId);

  const commentSnapshots = await postRef.collection("comments").get();
  const likeSnapshots = await postRef.collection("likes").get();
  const dislikeSnapshots = await postRef.collection("dislikes").get();

  batch.delete(postRef);
  batch.delete(userPostRef);

  commentSnapshots.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  likeSnapshots.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  dislikeSnapshots.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch
    .commit()
    .then(() => onSuccess())
    .catch((e) => onError(e));
}

export async function editPost(
  forumId,
  postId,
  post,
  onSuccess,
  onError,
  app = firebase
) {
  const currentUID = app.auth().currentUser.uid;
  const time = new Date();

  await app
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId)
    .update({ ...post, lastEdited: time })
    .then(onSuccess)
    .catch((e) => onError(e));
}

export async function getLikeStatus(
  forumId,
  postId,
  callbackSuccess,
  app = firebase
) {
  const currentUID = app.auth().currentUser.uid;
  const combinedId = forumId + postId;
  const userRef = app.firestore().collection("users").doc(currentUID);

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

export async function getNumberOfLikes(
  forumId,
  postId,
  callbackSuccess,
  app = firebase
) {
  const postRef = app
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

export async function updateLikes(
  forumId,
  postId,
  postLikeStatus,
  app = firebase
) {
  const currentUID = app.auth().currentUser.uid;
  const db = app.firestore();
  const postRef = db
    .collection("forums")
    .doc(forumId)
    .collection("posts")
    .doc(postId);
  const likeRef = postRef.collection("likes").doc(currentUID);
  const dislikeRef = postRef.collection("dislikes").doc(currentUID);

  const userRef = db.collection("users").doc(currentUID);
  const userLikeRef = userRef.collection("likes").doc(forumId + postId);
  const userDislikeRef = userRef.collection("dislikes").doc(forumId + postId);
  const batch = db.batch();

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

  await batch
    .commit()
    .then(() => console.log("update success"))
    .catch((e) => console.error(e));
}
