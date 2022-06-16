import {
  createGroup,
  editGroupDetails,
  addUserToGroup,
  removeUserFromGroup,
  cancelGroupInvitation,
  acceptGroupInvitation,
  declineGroupInvitation,
  leaveGroup,
  deleteGroup
} from "../../../src/services/Friend/HandleGroup";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test group system", () => {
  const {
    mockBatch,
    mockBatchCommit,
    mockBatchDelete,
    mockBatchSet,
    mockSet
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const db = admin.firestore();
  const userID = admin.auth().currentUser.uid;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can create group", async () => {
    const newGroupID = await createGroup(
      "group4",
      "Fourth group",
      "fourth-img-link",
      admin
    );
    const userRef = db.collection("users").doc(userID);
    const groupRef = db.collection("groups").doc(newGroupID);

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchSet).toHaveBeenNthCalledWith(1, groupRef, {
      name: "group4",
      description: "Fourth group",
      img: "fourth-img-link",
      lastMessageText: "",
      lastMessageAt: null
    });
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("members").doc(userID),
      {
        showMessage: false,
        showNotif: false
      }
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      3,
      userRef.collection("groupCreated").doc(newGroupID),
      {}
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      4,
      userRef.collection("groupJoined").doc(newGroupID),
      {}
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can edit group details", async () => {
    await editGroupDetails(
      "group1",
      "Another group",
      "This is another group",
      "other-image-link",
      admin
    );

    expect(mockSet).toHaveBeenCalledWith({
      name: "Another group",
      description: "This is another group",
      img: "other-image-link"
    });
  });

  test("Can add user to group", async () => {
    await addUserToGroup("group1", "imba", admin);
    const userRef = db.collection("users").doc("imba");
    const groupRef = db.collection("groups").doc("group1");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      userRef.collection("groupInvited").doc("group1"),
      {}
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("pendingMembers").doc("imba"),
      {}
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can remove user from group", async () => {
    await removeUserFromGroup("group3", "yem456", admin);
    const userRef = db.collection("users").doc("yem456");
    const groupRef = db.collection("groups").doc("group3");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      userRef.collection("groupJoined").doc("group3")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("members").doc("yem456")
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can cancel group invitation", async () => {
    await cancelGroupInvitation("group1", "cupu", admin);
    const userRef = db.collection("users").doc("cupu");
    const groupRef = db.collection("groups").doc("group1");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      userRef.collection("groupInvited").doc("group1")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("pendingMembers").doc("cupu")
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can accept group invitation", async () => {
    await acceptGroupInvitation("group2", admin);
    const userRef = db.collection("users").doc(userID);
    const groupRef = db.collection("groups").doc("group2");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      userRef.collection("groupInvited").doc("group2")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("pendingMembers").doc(userID)
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      userRef.collection("groupJoined").doc("group2"),
      {}
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("members").doc(userID),
      { showMessage: false, showNotif: false }
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can decline group invitation", async () => {
    await declineGroupInvitation("group2", admin);
    const userRef = db.collection("users").doc(userID);
    const groupRef = db.collection("groups").doc("group2");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      userRef.collection("groupInvited").doc("group2")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("pendingMembers").doc(userID)
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can leave group", async () => {
    await leaveGroup("group1", admin);
    const userRef = db.collection("users").doc(userID);
    const groupRef = db.collection("groups").doc("group1");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      1,
      userRef.collection("groupJoined").doc("group1")
    );
    expect(mockBatchDelete).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("members").doc(userID)
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can delete group", async () => {
    await deleteGroup("group1", admin);
    const groupRef = db.collection("groups").doc("group1");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchDelete).toHaveBeenLastCalledWith(groupRef);
    expect(mockBatchCommit).toHaveBeenCalled();
  });
});
