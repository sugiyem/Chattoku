import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import EditPendingGroupMemberScreen from "../../../src/screens/Friend/EditPendingGroupMemberScreen";

const mockGoBack = jest.fn();
const mockNavigation = {
  goBack: mockGoBack
};
const mockSetState = jest.fn();
const mockRoute = {
  params: {
    groupInfo: {
      id: "weeb",
      name: "Weebs",
      description: "weebs only",
      img: "weeb-img"
    }
  }
};

jest.mock("../../../src/services/Friend/FetchGroup");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Edit Group's Invitation UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <EditPendingGroupMemberScreen
        navigation={mockNavigation}
        route={mockRoute}
      />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Pending Member's List"
    );
  });

  it("Search bar and buttons are working as expected", () => {
    const { getByTestId } = render(
      <EditPendingGroupMemberScreen
        navigation={mockNavigation}
        route={mockRoute}
      />
    );

    fireEvent.press(getByTestId("goBack"));
    fireEvent.changeText(getByTestId("searchBar"), "test");

    expect(mockGoBack).toHaveBeenCalled();
    expect(mockSetState).toHaveBeenLastCalledWith("test");
  });
});
