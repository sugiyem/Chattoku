import React from "react";
import renderer from "react-test-renderer";
import CommentList from "../../../src/components/Forum/ForumComment/CommentList";

jest.mock("../../../src/services/Forum/FetchComment");
jest.mock("../../../src/services/Forum/HandleForumAdmin");
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Comment List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(<CommentList forumId="forum-1" postId="post-1" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
