import {
  fetchGroup,
  fetchGroupInvitation,
  fetchGroupInfo,
  checkGroupInvitation,
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../../src/firebase/FetchGroup";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test group data fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can fetch data of specific group", async () => {
    let result = {};

    fetchGroupInfo({
      groupID: "group2",
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toEqual({
      id: "group2",
      name: "Second group",
      description: "This is a group",
      img: "second-image-link"
    });
  });

  test("Can check if there is pending group invitation", async () => {
    let result = false;

    checkGroupInvitation({
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

  test("Can fetch data of all groups joined by user", async () => {
    let result = [];

    fetchGroup({
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      id: "group1",
      name: "First group",
      description: "This is a group",
      img: "first-image-link"
    });
    expect(result).toContainEqual({
      id: "group3",
      name: "Third group",
      description: "This is a group",
      img: "third-image-link"
    });
  });

  test("Can fetch data of all groups that invite user", async () => {
    let result = {};

    fetchGroupInvitation({
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toHaveLength(1);
    expect(result).toContainEqual({
      id: "group2",
      name: "Second group",
      description: "This is a group",
      img: "second-image-link"
    });
  });

  test("Can fetch data of all members of specific group", async () => {
    let result = [];

    fetchGroupMembers({
      groupID: "group2",
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      id: "yem456",
      username: "Yemima",
      img: "yemima-img"
    });
    expect(result).toContainEqual({
      id: "imba",
      username: "Elbert",
      img: "elbert-img"
    });
  });

  test("Can fetch data of all pending members of specific group", async () => {
    let result = [];

    fetchPendingGroupMembers({
      groupID: "group2",
      onSuccess: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toHaveLength(1);
    expect(result).toContainEqual({
      id: "yem123",
      username: "Sugiyem",
      img: "sugiyem-img"
    });
  });
});
