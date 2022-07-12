import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import FriendRequestsSentScreen from "../../../src/screens/Friend/FriendRequestsSentScreen";

const mockGoBack = jest.fn();
const mockSetState = jest.fn();

jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      goBack: mockGoBack
    })
  };
});
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Friend Sent Request List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<FriendRequestsSentScreen />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Pending Requests Sent"
    );
  });

  it("Buttons and text bar are working as expected", () => {
    const { getByTestId } = render(<FriendRequestsSentScreen />);

    fireEvent.press(getByTestId("goBack"));
    fireEvent.changeText(getByTestId("searchBar"), "Elbert CS God");

    expect(mockGoBack).toHaveBeenCalled();
    expect(mockSetState).toHaveBeenLastCalledWith("Elbert CS God");
  });
});
