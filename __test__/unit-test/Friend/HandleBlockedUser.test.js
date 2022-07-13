import {
  blockUser,
  unblockUser,
  isBlockedByCurrentUser,
  isCurrentUserBlocked
} from "../../../src/services/Friend/HandleBlockedUser";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Can test block user system", () => {
  const {
    mockBatch,
    mockBatchCommit,
    mockBatchDelete,
    mockBatchSet,
    mockCollection,
    mockDelete,
    mockDoc
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const db = admin.firestore();
  const userID = admin.auth().currentUser.uid;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can block user", async () => {
    await blockUser("yem456", admin);

    const currentUserRef = db.collection("users").doc(userID);
    const otherUserRef = db.collection("users").doc("yem456");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      currentUserRef.collection("friends").doc("yem456")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      otherUserRef.collection("friends").doc(userID)
    );
    expect(mockBatchSet).toHaveBeenCalledWith(
      currentUserRef.collection("blockedUsers").doc("yem456"),
      {}
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can unblock user", async () => {
    await unblockUser("random", admin);

    expect(mockCollection).toHaveBeenNthCalledWith(1, "users");
    expect(mockDoc).toHaveBeenNthCalledWith(1, userID);
    expect(mockCollection).toHaveBeenNthCalledWith(2, "blockedUsers");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "random");
    expect(mockDelete).toHaveBeenCalled();
  });

  test("Can know if the current user is blocking other", async () => {
    let result = false;

    isBlockedByCurrentUser(
      "random-2",
      () => {
        result = true;
      },
      () => {
        result = false;
      },
      admin
    );

    await flushPromises();

    expect(result).toBeTruthy();
  });

  test("Can know if the current user is not blocking other", async () => {
    let result = false;

    isBlockedByCurrentUser(
      "yem456",
      () => {
        result = true;
      },
      () => {
        result = false;
      },
      admin
    );

    await flushPromises();

    expect(result).toBeFalsy();
  });

  test("Can know if the current user is blocked by other", async () => {
    let result = false;

    isCurrentUserBlocked(
      "random-3",
      () => {
        result = true;
      },
      () => {
        result = false;
      },
      admin
    );

    await flushPromises();

    expect(result).toBeTruthy();
  });

  test("Can know if the current user is not blocked by other", async () => {
    let result = false;

    isCurrentUserBlocked(
      "yem456",
      () => {
        result = true;
      },
      () => {
        result = false;
      },
      admin
    );

    await flushPromises();

    expect(result).toBeFalsy();
  });
});
