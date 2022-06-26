import {
  fetchPrivateChatMessages,
  fetchGroupChatMessages
} from "../../../src/services/Chat/FetchChatMessages";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";
import { Timestamp } from "firestore-jest-mock/mocks/timestamp";

mockFirebase(fakeFirebase);

describe("Test messages fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can fetch all messages from private chat", async () => {
    let result = [];

    fetchPrivateChatMessages({
      recipientID: "yem456",
      onSuccesfulFetch: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toEqual([
      { createdAt: new Timestamp(0, 0).toDate(), text: "1st-message" },
      { createdAt: new Timestamp(1, 1).toDate(), text: "2nd-message" }
    ]);
  });

  test("Can fetch all messages from group chat", async () => {
    let result = [];

    fetchGroupChatMessages({
      groupID: "group1",
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toEqual([
      { createdAt: new Timestamp(0, 0).toDate(), text: "1st-group-message" },
      { createdAt: new Timestamp(1, 1).toDate(), text: "2nd-group-message" }
    ]);
  });
});
