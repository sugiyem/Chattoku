import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import GroupRequestsScreen from "../../../src/screens/Friend/GroupRequestsScreen";

const mockReplace = jest.fn();
const mockSetState = jest.fn();
const mockNavigation = {
  replace: mockReplace
};

jest.mock("../../../src/services/Friend/FetchGroup");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Group Invitation List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <GroupRequestsScreen navigation={mockNavigation} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Group Requests List"
    );
  });

  it("Buttons and search bar are working as expected", () => {
    const { getByTestId } = render(
      <GroupRequestsScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("goBack"));
    fireEvent.changeText(getByTestId("searchBar"), "Elbert CS God");

    expect(mockReplace).toHaveBeenCalledWith("GroupList");
    expect(mockSetState).toHaveBeenLastCalledWith("Elbert CS God");
  });
});
