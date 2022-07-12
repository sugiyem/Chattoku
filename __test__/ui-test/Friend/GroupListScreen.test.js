import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import GroupListScreen from "../../../src/screens/Friend/GroupListScreen";

const mockNavigate = jest.fn();
const mockReplace = jest.fn();
const mockSetState = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  replace: mockReplace
};

jest.mock("../../../src/services/Friend/FetchGroup");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Group List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <GroupListScreen navigation={mockNavigation} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Groups List"
    );
  });

  it("Buttons and search bar are working as expected", () => {
    const { getByTestId } = render(
      <GroupListScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("friendList"));
    fireEvent.press(getByTestId("createGroup"));
    fireEvent.press(getByTestId("groupRequests"));
    fireEvent.changeText(getByTestId("searchBar"), "Elbert CS God");

    expect(mockReplace).toHaveBeenNthCalledWith(1, "FriendList");
    expect(mockNavigate).toHaveBeenNthCalledWith(1, "GroupCreation");
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "GroupRequests");
    expect(mockSetState).toHaveBeenLastCalledWith("Elbert CS God");
  });
});
