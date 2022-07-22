import { FetchPreviousPosts } from "../../../src/services/Forum/FetchPreviousPosts";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test user's previous posts fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Can fetch all previous posts of current user", async () => {
    FetchPreviousPosts((posts) => {
      expect(posts).toEqual([
        {
          forumData: {
            id: "forum-1",
            owner: "yem123",
            title: "First Forum",
            banner: "first-forum-banner",
            img: "first-forum-img",
            desc: "first-forum-desc"
          },
          postData: {
            forumId: "forum-1",
            postId: "forum-1-post-1",
            uid: "yem123",
            title: "First Post Title",
            content: "This is my first post"
          }
        },
        {
          forumData: {
            id: "forum-2",
            owner: "yem456",
            title: "Second Forum",
            banner: "second-forum-banner",
            img: "second-forum-img",
            desc: "second-forum-desc"
          },
          postData: {
            forumId: "forum-2",
            postId: "forum-2-post-1",
            uid: "yem123",
            title: "Real First Post",
            content: "Actually, this is my first post"
          }
        }
      ]);
    }, admin);

    await flushPromises();
  });
});
