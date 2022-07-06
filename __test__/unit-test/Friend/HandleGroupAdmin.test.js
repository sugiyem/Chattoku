import {
  demoteAdminToMember,
  promoteMemberToAdmin
} from "../../../src/services/Friend/HandleGroupAdmin";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test group admin system", () => {
  const {
    mockCollection,
    mockDelete,
    mockDoc,
    mockSet
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const db = admin.firestore();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can promote member to admin", async () => {
    await promoteMemberToAdmin("group3", "cupu", admin);

    expect(mockCollection).toHaveBeenLastCalledWith("admins");
    expect(mockDoc).toHaveBeenLastCalledWith("cupu");
    expect(mockSet).toHaveBeenCalledWith({});
  });

  test("Can demote admin to member", async () => {
    await demoteAdminToMember("group3", "yem456", admin);

    expect(mockCollection).toHaveBeenLastCalledWith("admins");
    expect(mockDoc).toHaveBeenLastCalledWith("yem456");
    expect(mockDelete).toHaveBeenCalled();
  });
});
