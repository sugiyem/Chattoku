import React from "react";
import renderer from "react-test-renderer";
import ChatDetailScreen from "../../../src/screens/Chat/ChatDetailScreen";

jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");
jest.mock("../../../src/services/Friend/HandleGroup");
jest.mock("../../../src/services/Chat/FetchChatMessages");
jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("@react-navigation/native", () => ({
  useIsFocused: jest.fn()
}));

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  push: jest.fn(),
  replace: jest.fn()
};

const mockRoute = {
  params: {
    userData: {
      id: "yem456",
      username: "Yemima",
      bio: "CS newbie",
      img: "yemima-img"
    }
  }
};

describe("Test Private Chat Page UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(
        <ChatDetailScreen navigation={mockNavigation} route={mockRoute} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
