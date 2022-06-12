import {
  addFriend,
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  removeFriend
} from "../../../src/firebase/HandleFriend";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test friend system", () => {
  const {
    mockBatch,
    mockBatchCommit,
    mockBatchDelete,
    mockBatchSet
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const db = admin.firestore();
  const userID = admin.auth().currentUser.uid;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can send friend request", async () => {
    await addFriend("random", admin);
    const userRef = db.collection("users").doc(userID);
    const friendRef = db.collection("users").doc("random");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      userRef.collection("friendRequestsSent").doc("random"),
      {}
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      friendRef.collection("friendRequestsReceived").doc(userID),
      {}
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can accept friend request", async () => {
    await acceptFriendRequest("cupu", admin);
    const userRef = db.collection("users").doc(userID);
    const friendRef = db.collection("users").doc("cupu");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      userRef.collection("friendRequestsReceived").doc("cupu")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      friendRef.collection("friendRequestsSent").doc("yem123")
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      userRef.collection("friends").doc("cupu"),
      {}
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      friendRef.collection("friends").doc(userID),
      {}
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can cancel friend request", async () => {
    await cancelFriendRequest("imba", admin);
    const userRef = db.collection("users").doc(userID);
    const friendRef = db.collection("users").doc("imba");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      userRef.collection("friendRequestsSent").doc("imba")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      friendRef.collection("friendRequestsReceived").doc(userID)
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can decline friend request", async () => {
    await declineFriendRequest("cupu", admin);
    const userRef = db.collection("users").doc(userID);
    const friendRef = db.collection("users").doc("cupu");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      userRef.collection("friendRequestsReceived").doc("cupu")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      friendRef.collection("friendRequestsSent").doc(userID)
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can remove friend", async () => {
    await removeFriend("yem456", admin);
    const userRef = db.collection("users").doc(userID);
    const friendRef = db.collection("users").doc("yem456");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      userRef.collection("friends").doc("yem456")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      friendRef.collection("friends").doc(userID)
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });
});
