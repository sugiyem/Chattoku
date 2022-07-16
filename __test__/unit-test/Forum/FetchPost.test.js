import FetchPost from "../../../src/services/Forum/FetchPost";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test forum posts fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Can fetch all posts in a specific forum", async () => {
    FetchPost(
      "forum-1",
      (posts) => {
        expect(posts).toHaveLength(3);
        expect(posts).toContainEqual({
          id: "forum-1-post-1",
          uid: "yem123",
          title: "First Post Title",
          content: "This is my first post"
        });
      },
      (e) => console.log(e),
      admin
    );

    await flushPromises();
  });
});
