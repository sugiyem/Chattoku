import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import AnimeHomeScreen from "../../../src/screens/Anime/AnimeHomeScreen";
import { fetchType } from "../../../src/constants/MyAnimeList";

const mockNavigate = jest.fn();
const mockSetState = jest.fn();
const mockNavigation = {
  navigate: mockNavigate
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
      .create(<AnimeHomeScreen navigation={mockNavigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Navigation button is working", () => {
    const { getByTestId } = render(
      <AnimeHomeScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("recommendationButton"));

    expect(mockNavigate).toHaveBeenCalledWith("Recommendation");
  });

  it("Anime icons are working", () => {
    const { getByTestId } = render(
      <AnimeHomeScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("airingIcon"));
    expect(mockSetState).toHaveBeenLastCalledWith(fetchType.AIRING);

    fireEvent.press(getByTestId("topIcon"));
    expect(mockSetState).toHaveBeenLastCalledWith(fetchType.TOP);
  });
});
