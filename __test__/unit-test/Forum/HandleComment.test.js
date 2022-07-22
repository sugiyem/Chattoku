import {
  AddComment,
  DeleteComment,
  EditComment
} from "../../../src/services/Forum/HandleComment";
import { mockFirebase } from "firestore-jest-mock/mocks/firebase";
import { fakeFirebase } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test comment system", () => {
  const {
    mockAdd,
    mockCollection,
    mockDelete,
    mockDoc,
    mockUpdate
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const userID = admin.auth().currentUser.uid;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can add comment to a specific post", async () => {
    const addCommentTime = await AddComment(
      "forum-1",
      "forum-1-post-1",
      "new comment",
      () => {},
      (e) => console.log(e),
      admin
    );

    expect(mockDoc).toHaveBeenNthCalledWith(1, "forum-1");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "forum-1-post-1");
    expect(mockCollection).toHaveBeenLastCalledWith("comments");
    expect(mockAdd).toHaveBeenCalledWith({
      content: "new comment",
      uid: userID,
      timestamp: addCommentTime
    });
  });

  test("Can delete comment", async () => {
    await DeleteComment(
      "forum-1",
      "forum-1-post-1",
      "comment-1",
      () => {},
      (e) => console.log(e),
      admin
    );

    expect(mockDoc).toHaveBeenNthCalledWith(1, "forum-1");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "forum-1-post-1");
    expect(mockDoc).toHaveBeenNthCalledWith(3, "comment-1");
    expect(mockCollection).toHaveBeenLastCalledWith("comments");
    expect(mockDelete).toHaveBeenCalled();
  });

  test("Can edit comment", async () => {
    const editCommentTime = await EditComment(
      "forum-1",
      "forum-1-post-1",
      "comment-1",
      "Edited comment",
      () => {},
      (e) => console.log(e),
      admin
    );

    expect(mockDoc).toHaveBeenNthCalledWith(1, "forum-1");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "forum-1-post-1");
    expect(mockDoc).toHaveBeenNthCalledWith(3, "comment-1");
    expect(mockCollection).toHaveBeenLastCalledWith("comments");
    expect(mockUpdate).toHaveBeenCalledWith({
      content: "Edited comment",
      lastEdited: editCommentTime
    });
  });
});
