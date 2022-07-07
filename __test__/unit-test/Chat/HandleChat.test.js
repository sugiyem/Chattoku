import {
  sendPrivateChat,
  sendGroupChat,
  removePrivateChat,
  removeGroupChat
} from "../../../src/services/Chat/HandleChat";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test chat system", () => {
  const {
    mockBatch,
    mockBatchCommit,
    mockBatchSet,
    mockBatchUpdate,
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

  test("Can send private message to user with lexicographically lower id", async () => {
    const { messageID, time } = await sendPrivateChat(
      { text: "Test" },
      "imba",
      admin
    );
    const chatRoomRef = db.collection("chatrooms").doc(`imba_${userID}`);

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      chatRoomRef.collection("messages").doc(messageID),
      {
        text: "Test",
        createdAt: time
      }
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      chatRoomRef,
      {
        showMessageToFirstUser: true,
        showMessageToSecondUser: true,
        showNotifToFirstUser: true,
        lastMessageAt: time,
        lastMessageText: "Test",
        lastMessageSenderID: userID
      },
      { merge: true }
    );
    expect(mockBatchCommit).toHaveBeenCalledWith();
  });

  test("Can send private message to user with lexicographically higher id", async () => {
    const { messageID, time } = await sendPrivateChat(
      { text: "Test" },
      "yem456",
      admin
    );
    const chatRoomRef = db.collection("chatrooms").doc(`${userID}_yem456`);

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      chatRoomRef.collection("messages").doc(messageID),
      {
        text: "Test",
        createdAt: time
      }
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      chatRoomRef,
      {
        showMessageToFirstUser: true,
        showMessageToSecondUser: true,
        showNotifToSecondUser: true,
        lastMessageAt: time,
        lastMessageText: "Test",
        lastMessageSenderID: userID
      },
      { merge: true }
    );
    expect(mockBatchCommit).toHaveBeenCalledWith();
  });

  test("Can send group message", async () => {
    const { messageID, time } = await sendGroupChat(
      { text: "Test" },
      "group3",
      admin
    );

    const groupRef = db.collection("groups").doc("group3");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchUpdate).toHaveBeenNthCalledWith(1, groupRef, {
      lastAccessedAt: time,
      lastMessageAt: time,
      lastMessageText: "Test",
      lastMessageSenderID: userID
    });
    expect(mockBatchUpdate).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("members").doc(userID),
      { showMessage: true }
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      1,
      groupRef.collection("messages").doc(messageID),
      {
        text: "Test",
        createdAt: time
      }
    );
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("members").doc("yem456"),
      { showMessage: true, showNotif: true }
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });

  test("Can remove private chat from user with lexicographically lower id", async () => {
    await removePrivateChat("imba", admin);

    expect(mockUpdate).toHaveBeenCalledWith({
      showMessageToSecondUser: false
    });
  });

  test("Can remove private chat from user with lexicographically higher id", async () => {
    await removePrivateChat("yem456", admin);

    expect(mockUpdate).toHaveBeenCalledWith({
      showMessageToFirstUser: false
    });
  });

  test("Can remove group chat", async () => {
    const time = await removeGroupChat("group1", admin);
    const groupRef = db.collection("groups").doc("group1");

    expect(mockBatch).toHaveBeenCalled();
    expect(mockBatchUpdate).toHaveBeenNthCalledWith(1, groupRef, {
      lastAccessedAt: time
    });
    expect(mockBatchUpdate).toHaveBeenNthCalledWith(
      2,
      groupRef.collection("members").doc(userID),
      { showMessage: false }
    );
    expect(mockBatchCommit).toHaveBeenCalled();
  });
});
