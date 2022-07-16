import {
  getBannedUsers,
  addBannedUsers,
  deleteBannedUsers,
  isUserBanned
} from "../../../src/services/Forum/HandleBannedUsers";
import { mockFirebase } from "firestore-jest-mock/mocks/firebase";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test forum ban system", () => {
  const {
    mockBatchCommit,
    mockBatchSet,
    mockCollection,
    mockDelete,
    mockDoc,
    mockBatchDelete,
    mockSet,
    mockUpdate
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const db = admin.firestore();
  const userID = admin.auth().currentUser.uid;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can ban user from a specific forum", async () => {
    await addBannedUsers("forum-1", "yem456", "spam posts", admin);

    expect(mockCollection).toHaveBeenNthCalledWith(1, "forums");
    expect(mockDoc).toHaveBeenNthCalledWith(1, "forum-1");
    expect(mockCollection).toHaveBeenNthCalledWith(2, "banned");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "yem456");
    expect(mockSet).toHaveBeenCalledWith({ reason: "spam posts" });
  });

  test("Can unban user", async () => {
    await deleteBannedUsers("forum-1", "random", admin);

    expect(mockCollection).toHaveBeenNthCalledWith(1, "forums");
    expect(mockDoc).toHaveBeenNthCalledWith(1, "forum-1");
    expect(mockCollection).toHaveBeenNthCalledWith(2, "banned");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "random");
    expect(mockDelete).toHaveBeenCalled();
  });

  test("Can know if user is banned from a specific forum", async () => {
    // User with ID "random" is banned from forum with id "forum-1"
    isUserBanned(
      "forum-1",
      "random",
      (props) => {
        expect(props.isFound).toBeTruthy();
      },
      admin
    );

    await flushPromises();
  });

  test("Can know if user is not banned from a specific forum", async () => {
    // User with ID "yem456" is not banned from forum with id "forum-1"
    isUserBanned(
      "forum-1",
      "yem456",
      (props) => {
        expect(props.isFound).toBeFalsy();
      },
      admin
    );

    await flushPromises();
  });

  test("Can get all banned users from a specific forum", async () => {
    getBannedUsers(
      "forum-1",
      (data) => {
        expect(data).toEqual([{ reason: "NSFW comments" }]);
      },
      admin
    );

    await flushPromises();
  });
});
