import { fetchGroupAdminIDs } from "../../../src/services/Friend/FetchGroupAdmin";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test group admin fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Can fetch all IDs of admin in a specific group", async () => {
    let result = [];

    fetchGroupAdminIDs({
      groupID: "group3",
      onSuccess: (data) => {
        result = data;
      },
      app: admin
    });

    await flushPromises();

    expect(result).toHaveLength(2);
    expect(result).toContainEqual("yem123");
    expect(result).toContainEqual("yem456");
  });
});
