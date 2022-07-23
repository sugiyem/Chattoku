import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import AnimeResultScreen from "../../../src/screens/Anime/AnimeResultScreen";

const mockGoBack = jest.fn();
const mockSetState = jest.fn();
const mockNavigation = {
  goBack: mockGoBack
};
const mockRoute = {
  params: {
    search: "test"
  }
};

jest.mock("@react-navigation/core", () => ({
  useNavigation: () => mockNavigation
}));

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [
    typeof initial === "boolean" ? true : initial,
    mockSetState
  ],
  useEffect: () => {}
}));

describe("Test AnimeHomeScreen UI", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <AnimeResultScreen navigation={mockNavigation} route={mockRoute} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Navigation button is working", () => {
    const { getByTestId } = render(
      <AnimeResultScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByTestId("backButton"));

    expect(mockGoBack).toHaveBeenCalled();
  });

  it("Search value is correct", () => {
    const { getByTestId } = render(
      <AnimeResultScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId("searchInput").props.value).toEqual(
      mockRoute.params.search
    );
  });
});
