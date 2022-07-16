import FetchForumData from "../../../src/services/Forum/FetchForumData";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test forum data fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Can fetch data of all available forums", async () => {
    FetchForumData(
      (forums) => {
        expect(forums).toHaveLength(3);
        expect(forums).toContainEqual({
          id: "forum-1",
          owner: "yem123",
          title: "First Forum",
          banner: "first-forum-banner",
          img: "first-forum-img",
          desc: "first-forum-desc"
        });
      },
      (e) => console.log(e),
      admin
    );

    await flushPromises();
  });
});
