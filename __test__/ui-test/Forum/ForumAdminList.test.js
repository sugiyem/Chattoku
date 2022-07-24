import React from "react";
import renderer from "react-test-renderer";
import ForumAdminList from "../../../src/components/Forum/ForumManagement/ForumAdminList";

jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("../../../src/services/Forum/HandleForumAdmin");

describe("Test Forum Admin List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<ForumAdminList forumId="forum-1" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
