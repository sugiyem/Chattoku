import NotifyAllFollowers from "../../../src/services/Forum/NotifyAllFollowers";
import { mockFirebase } from "firestore-jest-mock/mocks/firebase";
import axios from "axios";
import { NOTIFICATION_URL } from "../../../src/constants/Miscellaneous";

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
      },
      {
        id: "imba",
        username: "Elbert",
        notificationToken: null
      }
    ],
    forums: [
      {
        id: "forum-1",
        _collections: {
          followers: [
            { id: "yem123", isNotificationOn: true },
            { id: "yem456", isNotificationOn: false },
            { id: "imba", isNotificationOn: true }
          ]
        }
      }
    ]
  }
});

describe("Test forum notification", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Can send notification to all forum's followers with notification on", async () => {
    await NotifyAllFollowers("forum-1", "First Forum", "New Post", admin);

    const expectedHeader = {
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json"
      }
    };

    const expectedMessage = {
      to: "sugiyem-token",
      sound: "default",
      title: "New On First Forum",
      body: "New Post",
      data: { someData: "goes here" }
    };

    expect(axios.post).toHaveBeenCalledWith(
      NOTIFICATION_URL,
      JSON.stringify(expectedMessage),
      expectedHeader
    );
  });
});
