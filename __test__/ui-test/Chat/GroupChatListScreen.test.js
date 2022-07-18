import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import GroupChatListScreen from "../../../src/screens/Chat/GroupChatListScreen";

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
    const tree = renderer.create(<GroupChatListScreen />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Group Chat List"
    );
  });

  it("Buttons are pressable", () => {
    const { getByTestId } = render(<GroupChatListScreen />);

    fireEvent.press(getByTestId("groupListButton"));
    fireEvent.press(getByTestId("privateChatButton"));
    fireEvent.changeText(getByTestId("searchBar"), "Farrel CS Noob");

    expect(mockNavigate).toHaveBeenCalledWith("Friends", {
      screen: "GroupList",
      initial: false
    });
    expect(mockPush).toHaveBeenCalledWith("ChatList");
    expect(mockSetState).toHaveBeenLastCalledWith("Farrel CS Noob");
  });
});
