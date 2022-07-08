import { fetchBlockedUsers } from "../../../src/services/Friend/FetchBlockedUsers";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test blocked user fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Can fetch all blocked users", async () => {
    let result = [];

    fetchBlockedUsers((data) => {
      result = data;
    }, admin);

    await flushPromises();

    expect(result).toEqual([
      {
        id: "random-2",
        username: "Anonim-2",
        img: "anonim-img-2",
        bio: undefined
      }
    ]);
  });
});
