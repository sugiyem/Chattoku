import FetchFollowedForumsData from "../../../src/services/Forum/FetchFollowedForumData";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test followed forum data fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Can fetch data of all followed forums", async () => {
    FetchFollowedForumsData(
      "yem123",
      (forums) => {
        expect(forums).toEqual([
          {
            id: "forum-1",
            owner: "yem123",
            title: "First Forum",
            banner: "first-forum-banner",
            img: "first-forum-img",
            desc: "first-forum-desc"
          }
        ]);
      },
      admin
    );

    await flushPromises();
  });
});
