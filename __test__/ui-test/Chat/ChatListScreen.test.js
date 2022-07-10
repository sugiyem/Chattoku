import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ChatListScreen from "../../../src/screens/Chat/ChatListScreen";

const mockNavigate = jest.fn();
const mockPush = jest.fn();
const mockSetState = jest.fn();

jest.mock("../../../src/services/Chat/FetchActiveChats");
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
      push: mockPush
    })
  };
});
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test private chat list UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<ChatListScreen />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Private Chat List"
    );
  });

  it("Buttons and input bar are working as expected", () => {
    const { getByTestId } = render(<ChatListScreen />);

    fireEvent.press(getByTestId("friendListButton"));
    fireEvent.press(getByTestId("groupChatButton"));
    fireEvent.changeText(getByTestId("searchBar"), "Elbert CS God");

    expect(mockNavigate).toHaveBeenCalledWith("Friends", {
      screen: "FriendList",
      initial: false
    });
    expect(mockPush).toHaveBeenCalledWith("GroupChatList");
    expect(mockSetState).toHaveBeenLastCalledWith("Elbert CS God");
  });
});
