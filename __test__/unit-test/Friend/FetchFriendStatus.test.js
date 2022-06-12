import {
  fetchFriend,
  fetchFriendRequestsSent,
  fetchFriendRequestsReceived,
  checkFriendRequestsReceived
} from "../../../src/firebase/FetchFriendStatus";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises, options } from "../../Helper";

mockFirebase(fakeFirebase, options);

describe("Test friend data fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can fetch data of all friends from a specific user", async () => {
    let result = [];

    fetchFriend({
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toHaveLength(1);
    expect(result).toContainEqual({
      id: "yem456",
      username: "Yemima",
      img: "yemima-img"
    });
  });

  test("Can fetch data of all users who sent friend request to a specific user", async () => {
    let result = [];

    fetchFriendRequestsReceived({
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toHaveLength(1);
    expect(result).toContainEqual({
      id: "cupu",
      username: "Farrel",
      img: "farrel-img"
    });
  });

  test("Can fetch data of all users who got friend request to a specific user", async () => {
    let result = [];

    fetchFriendRequestsSent({
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toHaveLength(1);
    expect(result).toContainEqual({
      id: "imba",
      username: "Elbert",
      img: "elbert-img"
    });
  });

  test("Can check if a specific user has pending friend request", async () => {
    let result = false;

    checkFriendRequestsReceived({
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
