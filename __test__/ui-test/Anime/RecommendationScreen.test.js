import React, { useEffect } from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import RecommendationScreen from "../../../src/screens/Anime/RecommendationScreen";

const mockNavigate = jest.fn();
const mockSetState = jest.fn();
const mockBackNavigate = jest.fn();
const mockNavigation = {
  goBack: mockBackNavigate,
  navigate: mockNavigate
};
const mockData = ["Action", "Fantasy", "Isekai"];

jest.mock("@react-navigation/core", () => ({
  useNavigation: () => mockNavigation
}));

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [
    typeof initial === "boolean" ? true : mockData,
    mockSetState
  ],
  useEffect: () => {}
}));

describe("Test RecommendationScreen UI", () => {
  it("Renders Correctly", () => {
    const tree = renderer
      .create(<RecommendationScreen navigation={mockNavigation} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Navigation Works", () => {
    const { getByTestId } = render(
      <RecommendationScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("backButton"));
    expect(mockBackNavigate).toHaveBeenCalled();

    fireEvent.press(getByTestId("genreButton"));
    expect(mockNavigate).toHaveBeenCalledWith("FavGenreRecommendation", {
      genres: mockData
    });

    fireEvent.press(getByTestId("animeButton"));
    expect(mockNavigate).toHaveBeenCalledWith("FavoriteAnime");
  });
});
