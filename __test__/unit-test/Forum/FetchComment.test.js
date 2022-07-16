import FetchComment from "../../../src/services/Forum/FetchComment";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test comment fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Can fetch all comments in a specific post", async () => {
    FetchComment(
      "forum-1",
      "forum-1-post-1",
      (comments) => {
        expect(comments).toHaveLength(2);
        expect(comments).toContainEqual({
          id: "comment-1",
          uid: "yem123",
          content: "Hi, I'm Sugiyem"
        });
        expect(comments).toContainEqual({
          id: "comment-2",
          uid: "cupu",
          content: "Hi, I'm Farrel"
        });
      },
      (e) => console.log(e),
      admin
    );

    await flushPromises();
  });
});
