import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ProfileOverlay from "../../../src/components/Forum/ProfileOverlay";
import Caution from "../../../src/components/Miscellaneous/Caution";
import { isBlockedByCurrentUser } from "../../../src/services/Friend/HandleBlockedUser";

const mockUserData = {
  id: "yem456",
  username: "Yemima",
  bio: "CS Noob",
  img: "yemima-img"
};
const mockContext = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../../src/components/Miscellaneous/Caution");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: (context) => mockContext
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate
  })
}));
jest.mock("../../../src/services/Friend/HandleFriend");
jest.mock("../../../src/services/Friend/FriendshipStatus");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Profile Overlay UI", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    isBlockedByCurrentUser.mockImplementation(
      (uid, callbackTrue, callbackFalse) => callbackFalse()
    );
  });

  it("Renders correctly", () => {
    const tree = renderer.create(<ProfileOverlay userData={mockUserData} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "name" }).props.children
    ).toContainEqual("Yemima");
    expect(instance.findByProps({ testID: "profile" }).props.source).toEqual({
      uri: "yemima-img"
    });
  });

  it("All interactable components are working as expected when other user is not blocked", () => {
    const { getByTestId } = render(<ProfileOverlay userData={mockUserData} />);

    // Can close the profile overlay
    fireEvent.press(getByTestId("close"));
    expect(mockContext).toHaveBeenCalledWith(null);

    // Message icon is working properly
    fireEvent.press(getByTestId("message"));
    expect(mockNavigate).toHaveBeenCalledWith("Chat", {
      screen: "ChatDetail",
      initial: false,
      params: {
        userData: mockUserData
      }
    });

    // Block icon is working properly
    fireEvent.press(getByTestId("block"));
    expect(Caution).toHaveBeenCalledWith(
      "This user will be blocked",
      expect.anything()
    );
  });

  it("Unblock button works properly", () => {
    isBlockedByCurrentUser.mockImplementation(
      (uid, callbackTrue, callbackFalse) => callbackTrue()
    );
    const { getByTestId } = render(<ProfileOverlay userData={mockUserData} />);

    fireEvent.press(getByTestId("unblock"));
    expect(Caution).toHaveBeenCalledWith(
      "This user will be unblocked",
      expect.anything()
    );
  });
});
