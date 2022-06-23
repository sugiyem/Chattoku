import { mockFirebase } from "firestore-jest-mock";
import axios from "axios";
import { NOTIFICATION_URL } from "../../../src/constants/Miscellaneous";
import {
  sendPushNotification,
  sendNotificationToAllGroupMembers
} from "../../../src/services/Miscellaneous/HandleNotification";

jest.mock("axios");

mockFirebase({
  database: {
    users: [
      {
        id: "yem123",
        username: "Sugiyem",
        notificationToken: "sugiyem-token"
      },
      {
        id: "yem456",
        username: "Yemima",
        notificationToken: "yemima-token"
      }
    ],
    groups: [
      {
        id: "group",
        _collections: { members: [{ id: "yem123" }, { id: "yem456" }] }
      }
    ]
  }
});

describe("Test notification", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  const header = {
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json"
    }
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can't send notification with null token", async () => {
    await sendPushNotification(null, "Title", "Body");

    expect(axios.post).not.toHaveBeenCalled();
  });

  test("Can send notification to a single user", async () => {
    await sendPushNotification("notifToken", "Title", "Body");

    const message = {
      to: "notifToken",
      sound: "default",
      title: "Title",
      body: "Body",
      data: { someData: "goes here" }
    };

    expect(axios.post).toHaveBeenCalledWith(
      NOTIFICATION_URL,
      JSON.stringify(message),
      header
    );
  });

  test("Can send notification to all group members", async () => {
    await sendNotificationToAllGroupMembers(
      "group",
      null,
      "Title",
      "Body",
      admin.firestore()
    );

    const message1 = {
      to: "sugiyem-token",
      sound: "default",
      title: "Title",
      body: "Body",
      data: { someData: "goes here" }
    };

    const message2 = {
      to: "yemima-token",
      sound: "default",
      title: "Title",
      body: "Body",
      data: { someData: "goes here" }
    };

    expect(axios.post).toHaveBeenNthCalledWith(
      1,
      NOTIFICATION_URL,
      JSON.stringify(message1),
      header
    );
    expect(axios.post).toHaveBeenNthCalledWith(
      2,
      NOTIFICATION_URL,
      JSON.stringify(message2),
      header
    );
  });

  test("Can send notification to all group members except one", async () => {
    await sendNotificationToAllGroupMembers(
      "group",
      "yem123",
      "Title",
      "Body",
      admin.firestore()
    );

    const message = {
      to: "yemima-token",
      sound: "default",
      title: "Title",
      body: "Body",
      data: { someData: "goes here" }
    };

    expect(axios.post).toHaveBeenCalledWith(
      NOTIFICATION_URL,
      JSON.stringify(message),
      header
    );
  });
});
