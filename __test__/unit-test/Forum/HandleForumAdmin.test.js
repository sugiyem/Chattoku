import {
  addAdmin,
  removeAdmin,
  editAdminPower,
  getAllAdmins,
  isUserAdmin,
  isAuthorizedToBanUsers,
  isAuthorizedToDeletePosts
} from "../../../src/services/Forum/HandleForumAdmin";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

const sampleAdminData = {
  uid: "yem456",
  authorities: ["Ban Users From Forum"]
};

describe("Test forum admin system", () => {
  const {
    mockCollection,
    mockDoc,
    mockDelete,
    mockSet
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const db = admin.firestore();
  const userID = admin.auth().currentUser.uid;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can promote a user to be an admin in a specific forum", async () => {
    await addAdmin(
      "forum-1",
      sampleAdminData,
      null,
      "First Forum",
      () => {},
      admin
    );

    expect(mockCollection).toHaveBeenNthCalledWith(1, "forums");
    expect(mockDoc).toHaveBeenNthCalledWith(1, "forum-1");
    expect(mockCollection).toHaveBeenNthCalledWith(2, "admins");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "yem456");
    expect(mockSet).toHaveBeenCalledWith(sampleAdminData);
  });

  test("Can demote admin in a specific forum", async () => {
    await removeAdmin("forum-1", "cupu", null, "First Forum", () => {}, admin);

    expect(mockCollection).toHaveBeenNthCalledWith(1, "forums");
    expect(mockDoc).toHaveBeenNthCalledWith(1, "forum-1");
    expect(mockCollection).toHaveBeenNthCalledWith(2, "admins");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "cupu");
    expect(mockDelete).toHaveBeenCalled();
  });

  test("Can edit admin power", async () => {
    await editAdminPower("forum-1", "cupu", ["Delete Posts"], () => {}, admin);

    expect(mockCollection).toHaveBeenNthCalledWith(1, "forums");
    expect(mockDoc).toHaveBeenNthCalledWith(1, "forum-1");
    expect(mockCollection).toHaveBeenNthCalledWith(2, "admins");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "cupu");
    expect(mockSet).toHaveBeenCalledWith(
      { authorities: ["Delete Posts"] },
      { merge: true }
    );
  });

  test("Can fetch all admins of a specific forum", async () => {
    getAllAdmins(
      "forum-1",
      (data) => {
        expect(data).toEqual([
          { authorities: ["Ban Users From Forum"], uid: "cupu" }
        ]);
      },
      admin
    );

    await flushPromises();
  });

  test("Can know if user is an admin of a specific post", async () => {
    // User with id "cupu" is an admin at forum with id "forum-1"
    isUserAdmin(
      "forum-1",
      "cupu",
      (props) => {
        expect(props.isFound).toBeTruthy();
      },
      admin
    );

    await flushPromises();
  });

  test("Can know if user is not an admin of a specific post", async () => {
    // User with id "yem456" is not an admin at forum with id "forum-1"
    isUserAdmin(
      "forum-1",
      "yem456",
      (props) => {
        expect(props.isFound).toBeFalsy();
      },
      admin
    );

    await flushPromises();
  });

  test("Can know if current user is authorized to delete post", async () => {
    // Current user is authorized to delete post at forum with id "forum-3"
    isAuthorizedToDeletePosts(
      "forum-3",
      (status) => {
        expect(status).toBeTruthy();
      },
      admin
    );

    await flushPromises();
  });

  test("Can know if user is not authorized to delete post", async () => {
    // Current user is not authorized to delete post at forum with id "forum-2"
    isAuthorizedToDeletePosts(
      "forum-2",
      (status) => {
        expect(status).toBeFalsy();
      },
      admin
    );

    await flushPromises();
  });

  test("Can know if user is authorized to ban user", async () => {
    // Current user is authorized to ban user at forum with id "forum-2"
    isAuthorizedToBanUsers(
      "forum-2",
      (status) => {
        expect(status).toBeTruthy();
      },
      admin
    );

    await flushPromises();
  });

  test("Can know if user is not authorized to ban user", async () => {
    // Current user is not authorized to ban user at forum with id "forum-3"
    isAuthorizedToBanUsers(
      "forum-3",
      (status) => {
        expect(status).toBeFalsy();
      },
      admin
    );

    await flushPromises();
  });
});
