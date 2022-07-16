import {
  addPost,
  deletePost,
  editPost,
  getLikeStatus,
  getNumberOfLikes,
  updateLikes
} from "../../../src/services/Forum/HandleForumPost";
import { mockFirebase } from "firestore-jest-mock/mocks/firebase";
import { fakeFirebase } from "../../Helper";
import { likeStatus } from "../../../src/constants/Post";

mockFirebase(fakeFirebase);

const samplePostData = {
  title: "post-title",
  content: "post-content"
};

describe("Test forum post system", () => {
  const {
    mockBatchCommit,
    mockBatchSet,
    mockCollection,
    mockDoc,
    mockBatchDelete,
    mockUpdate
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const db = admin.firestore();
  const userID = admin.auth().currentUser.uid;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can add post to a forum", async () => {
    const { postID, time } = await addPost(
      "forum-1",
      samplePostData,
      "First forum",
      () => {},
      (e) => console.log(e),
      admin
    );

    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      db.collection("forums").doc("forum-1").collection("posts").doc(postID),
      { ...samplePostData, uid: userID, timestamp: time }
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      db
        .collection("users")
        .doc(userID)
        .collection("posts")
        .doc(`forum-1${postID}`),
      {
        postId: postID,
        forumId: "forum-1",
        timestamp: time
      }
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can delete post", async () => {
    await deletePost(
      "forum-1",
      "forum-1-post-1",
      userID,
      () => {},
      (e) => console.log(e),
      admin
    );

    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      db
        .collection("forums")
        .doc("forum-1")
        .collection("posts")
        .doc("forum-1-post-1")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      db
        .collection("users")
        .doc(userID)
        .collection("posts")
        .doc("forum-1forum-1-post-1")
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can edit post", async () => {
    const editPostTime = await editPost(
      "forum-1",
      "forum-1-post-2",
      samplePostData,
      () => {},
      (e) => console.log(e),
      admin
    );

    expect(mockCollection).toHaveBeenLastCalledWith("posts");
    expect(mockDoc).toHaveBeenLastCalledWith("forum-1-post-2");
    expect(mockUpdate).toHaveBeenCalledWith({
      ...samplePostData,
      lastEdited: editPostTime
    });
  });

  test("Can get user's like status of current post", async () => {
    // User liked this post
    await getLikeStatus(
      "forum-1",
      "forum-1-post-1",
      (like) => {
        expect(like).toEqual(likeStatus.LIKE);
      },
      admin
    );

    // User disliked this post
    await getLikeStatus(
      "forum-1",
      "forum-1-post-2",
      (like) => {
        expect(like).toEqual(likeStatus.DISLIKE);
      },
      admin
    );

    // User didn't like nor dislike this post
    await getLikeStatus(
      "forum-1",
      "forum-1-post-3",
      (like) => {
        expect(like).toEqual(likeStatus.NEUTRAL);
      },
      admin
    );
  });

  test("Can get the number of likes of current post", async () => {
    // This post has 1 like and 0 dislike
    await getNumberOfLikes(
      "forum-1",
      "forum-1-post-1",
      (numberOfLikes) => {
        expect(numberOfLikes).toEqual(1);
      },
      admin
    );

    // This post has 0 like and 1 dislike
    await getNumberOfLikes(
      "forum-1",
      "forum-1-post-2",
      (numberOfLikes) => {
        expect(numberOfLikes).toEqual(-1);
      },
      admin
    );

    // This post has 0 like and 0 dislike
    await getNumberOfLikes(
      "forum-1",
      "forum-1-post-3",
      (numberOfLikes) => {
        expect(numberOfLikes).toEqual(0);
      },
      admin
    );
  });

  test("Can like a post", async () => {
    await updateLikes("forum-1", "forum-1-post-2", likeStatus.LIKE, admin);

    const userRef = db.collection("users").doc(userID);
    const postRef = db
      .collection("forums")
      .doc("forum-1")
      .collection("posts")
      .doc("forum-1-post-2");

    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      postRef.collection("dislikes").doc(userID)
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      userRef.collection("dislikes").doc("forum-1forum-1-post-2")
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      postRef.collection("likes").doc(userID),
      {}
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      userRef.collection("likes").doc("forum-1forum-1-post-2"),
      {}
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can dislike a post", async () => {
    await updateLikes("forum-1", "forum-1-post-1", likeStatus.DISLIKE, admin);

    const userRef = db.collection("users").doc(userID);
    const postRef = db
      .collection("forums")
      .doc("forum-1")
      .collection("posts")
      .doc("forum-1-post-1");

    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      postRef.collection("likes").doc(userID)
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      userRef.collection("likes").doc("forum-1forum-1-post-1")
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      postRef.collection("dislikes").doc(userID),
      {}
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      userRef.collection("dislikes").doc("forum-1forum-1-post-1"),
      {}
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can unlike or undislike a post", async () => {
    await updateLikes("forum-1", "forum-1-post-2", likeStatus.NEUTRAL, admin);

    const userRef = db.collection("users").doc(userID);
    const postRef = db
      .collection("forums")
      .doc("forum-1")
      .collection("posts")
      .doc("forum-1-post-2");

    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      postRef.collection("dislikes").doc(userID)
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      postRef.collection("likes").doc(userID)
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      3,
      userRef.collection("dislikes").doc("forum-1forum-1-post-2")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      4,
      userRef.collection("likes").doc("forum-1forum-1-post-2")
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });
});
