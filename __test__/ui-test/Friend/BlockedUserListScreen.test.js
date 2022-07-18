import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import BlockedUserListScreen from "../../../src/screens/Friend/BlockedUserListScreen";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockSetState = jest.fn();

jest.mock("../../../src/services/Friend/FetchBlockedUsers");
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      goBack: mockGoBack,
      navigate: mockNavigate
    })
  };
});
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Blocked List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<BlockedUserListScreen />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Blocked List"
    );
  });

  it("Buttons and search bar are working as expected", () => {
    const { getByTestId } = render(<BlockedUserListScreen />);

    fireEvent.press(getByTestId("goBack"));
    fireEvent.press(getByTestId("addBlocked"));
    fireEvent.changeText(getByTestId("searchBar"), "Farrel CS Newbie");

    expect(mockGoBack).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("AddBlockedUser");
    expect(mockSetState).toHaveBeenLastCalledWith("Farrel CS Newbie");
  });
});
