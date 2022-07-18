import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import FriendListScreen from "../../../src/screens/Friend/FriendListScreen";

const mockNavigate = jest.fn();
const mockSetState = jest.fn();

jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate
    })
  };
});
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Friend List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<FriendListScreen />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Friends List"
    );
  });

  it("Buttons and text bar are working as expected", () => {
    const { getByTestId } = render(<FriendListScreen />);

    fireEvent.press(getByTestId("addFriend"));
    fireEvent.press(getByTestId("groupList"));
    fireEvent.press(getByTestId("blockedList"));
    fireEvent.press(getByTestId("pendingRequest"));
    fireEvent.changeText(getByTestId("searchBar"), "Elbert CS God");

    expect(mockNavigate).toHaveBeenNthCalledWith(1, "AddFriend");
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "GroupList");
    expect(mockNavigate).toHaveBeenNthCalledWith(3, "BlockedUserList");
    expect(mockNavigate).toHaveBeenNthCalledWith(4, "FriendRequestsReceived");
    expect(mockSetState).toHaveBeenLastCalledWith("Elbert CS God");
  });
});
