import {
  fetchActivePrivateChats,
  fetchActiveGroupChats,
  checkUnreadPrivateMessages,
  checkUnreadGroupMessages
} from "../../../src/services/Chat/FetchActiveChats";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";
import { Timestamp } from "firestore-jest-mock/mocks/timestamp";

mockFirebase(fakeFirebase);

describe("Test active chats fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can fetch all active private chats", async () => {
    let result = [];

    fetchActivePrivateChats({
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toEqual([
      {
        showNotif: true,
        lastMessageTime: new Timestamp(2, 2).toDate(),
        lastMessage: "special-message",
        id: "imba",
        username: "Elbert",
        img: "elbert-img"
      },
      {
        showNotif: false,
        lastMessageTime: new Timestamp(1, 1).toDate(),
        lastMessage: "2nd-message",
        id: "yem456",
        username: "Yemima",
        img: "yemima-img"
      }
    ]);
  });

  test("Can fetch all active group chats", async () => {
    let result = [];

    fetchActiveGroupChats({
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toEqual([
      {
        id: "group3",
        name: "Third group",
        img: "third-image-link",
        lastMessage: "other-group-message",
        lastMessageTime: new Timestamp(2, 2).toDate(),
        showNotif: true
      }
    ]);
  });

  test("Can check if user has unread private messages", async () => {
    let result = false;

    checkUnreadPrivateMessages({
      onFound: () => {
        result = true;
      },
      onNotFound: () => {
        result = false;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toBeTruthy();
  });

  test("Can check if user has unread group messages", async () => {
    let result = false;

    checkUnreadGroupMessages({
      onFound: () => {
        result = true;
      },
      onNotFound: () => {
        result = false;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toBeTruthy();
  });
});
