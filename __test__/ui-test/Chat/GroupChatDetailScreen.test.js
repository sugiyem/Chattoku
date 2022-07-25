import React from "react";
import renderer from "react-test-renderer";
import GroupChatDetailScreen from "../../../src/screens/Chat/GroupChatDetailScreen";

jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");
jest.mock("../../../src/services/Friend/HandleGroup");
jest.mock("../../../src/services/Chat/FetchChatMessages");
jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, jest.fn()]
}));

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  push: jest.fn(),
  replace: jest.fn()
};

const mockRoute = {
  params: {
    groupData: {
      id: "group-1",
      name: "Weebs",
      description: "For weeb only",
      img: "w-img"
    }
  }
};

describe("Test Group Chat Page UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(
        <GroupChatDetailScreen navigation={mockNavigation} route={mockRoute} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
