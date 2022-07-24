import React from "react";
import renderer from "react-test-renderer";
import PostList from "../../../src/components/Forum/ForumPost/PostList";

jest.mock("../../../src/services/Forum/HandleForumPost");
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Post List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(
        <PostList
          forumId="forum-1"
          isBanned={false}
          isOwner={true}
          posts={[]}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
