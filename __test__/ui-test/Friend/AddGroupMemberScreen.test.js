import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import AddGroupMemberScreen from "../../../src/screens/Friend/AddGroupMemberScreen";

const mockSetState = jest.fn();
const mockGoBack = jest.fn();
const mockNavigation = {
  goBack: mockGoBack
};
const mockRoute = {
  params: {
    groupInfo: {
      id: "w",
      name: "Weebs",
      description: "weebs only",
      img: "weeb-img"
    }
  }
};

jest.mock("../../../src/services/Friend/FetchGroup");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Add Group Member Screen UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <AddGroupMemberScreen navigation={mockNavigation} route={mockRoute} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Add Friends to Group"
    );
  });

  it("button and search bar is working as expected", () => {
    const { getByTestId } = render(
      <AddGroupMemberScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByTestId("goBack"));
    fireEvent.changeText(getByTestId("searchBar"), "Sugiyem CS Noob");

    expect(mockGoBack).toHaveBeenCalled();
    expect(mockSetState).toHaveBeenLastCalledWith("Sugiyem CS Noob");
  });
});
