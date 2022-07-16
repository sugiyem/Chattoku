import {
  createForum,
  editForum,
  getForumFollowData,
  followForum,
  unfollowForum,
  updateNotification
} from "../../../src/services/Forum/HandleForum";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase } from "../../Helper";

mockFirebase(fakeFirebase);

const sampleForumData = {
  banner: "forum-banner",
  img: "forum-img",
  title: "forum-title",
  desc: "forum-desc"
};

describe("Test forum system", () => {
  const {
    mockBatchCommit,
    mockBatchSet,
    mockCollection,
    mockDoc,
    mockSet,
    mockBatchDelete
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const db = admin.firestore();
  const userID = admin.auth().currentUser.uid;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can create forum", async () => {
    const newForumID = await createForum(sampleForumData, () => {}, admin);

    const forumRef = db.collection("forums").doc(newForumID);

    expect(mockBatchSet).toHaveBeenNthCalledWith(1, forumRef, {
      ...sampleForumData,
      owner: userID
    });
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      forumRef.collection("followers").doc(userID),
      { isNotificationOn: true }
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      3,
      db.collection("users").doc(userID).collection("follows").doc(newForumID),
      {}
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can edit forum's info", async () => {
    const newForumData = { ...sampleForumData, id: "forum-1" };
    await editForum(newForumData, () => {}, admin);

    expect(mockCollection).toHaveBeenCalledWith("forums");
    expect(mockDoc).toHaveBeenCalledWith("forum-1");
    expect(mockSet).toHaveBeenCalledWith({ ...newForumData });
  });

  test("Can follow forum", async () => {
    await followForum("forum-2", () => {}, admin);

    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      db.collection("users").doc(userID).collection("follows").doc("forum-2"),
      {}
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      db
        .collection("forums")
        .doc("forum-2")
        .collection("followers")
        .doc(userID),
      { isNotificationOn: true }
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can unfollow forum", async () => {
    await unfollowForum("forum-1", () => {}, admin);

    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      db.collection("users").doc(userID).collection("follows").doc("forum-1")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      db.collection("forums").doc("forum-1").collection("followers").doc(userID)
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can change followed forum's notification setting", async () => {
    await updateNotification("forum-1", true, () => {}, admin);

    expect(mockCollection).toHaveBeenNthCalledWith(1, "forums");
    expect(mockDoc).toHaveBeenNthCalledWith(1, "forum-1");
    expect(mockCollection).toHaveBeenNthCalledWith(2, "followers");
    expect(mockDoc).toHaveBeenNthCalledWith(2, userID);
    expect(mockSet).toHaveBeenCalledWith({ isNotificationOn: true });
  });
});
