import React from "react";
import renderer from "react-test-renderer";
import ChatSections from "../../../src/components/Chat/ChatSections";

jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");
jest.mock("react-native-gifted-chat");

describe("Test Chat Section UI", () => {
  it("Renders correctly", () => {
    const mockUserData = {
      id: "yem456",
      username: "Yemima",
      img: "yemima-img"
    };
    const tree = renderer
      .create(<ChatSections userData={mockUserData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
