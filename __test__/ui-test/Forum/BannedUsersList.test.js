import React from "react";
import renderer from "react-test-renderer";
import BannedUsersList from "../../../src/components/Forum/ForumManagement/BannedUsersList";

jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("../../../src/services/Forum/HandleBannedUsers");

describe("Test Banned Users List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<BannedUsersList />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
