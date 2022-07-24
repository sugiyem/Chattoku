import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import PastPostsScreen from "../../../src/screens/Profile/PastPostsScreen";

const mockGoBack = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: mockGoBack
  }),
  useIsFocused: () => true
}));
jest.mock("../../../src/services/Forum/FetchPreviousPosts");

describe("Test Past Post Screen UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<PastPostsScreen />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      " Your Previous Posts "
    );
  });

  it("Back button is working as expected", () => {
    const { getByTestId } = render(<PastPostsScreen />);

    fireEvent.press(getByTestId("goBack"));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
