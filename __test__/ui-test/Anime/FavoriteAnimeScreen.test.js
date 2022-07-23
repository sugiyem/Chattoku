import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import FavoriteAnimeScreen from "../../../src/screens/Anime/FavoriteAnimeScreen";

const mockNavigate = jest.fn();
const mockSetState = jest.fn();
const mockBackNavigate = jest.fn();
const mockNavigation = {
  goBack: mockBackNavigate,
  navigate: mockNavigate
};
const mockData = [
  {
    demographics: [],
    genres: ["Action", "Adventure", "Fantasy"],
    id: 23321,
    image: "https://cdn.myanimelist.net/images/anime/5/68097.jpg",
    themes: ["Adult Cast", "Video Game"],
    title: "Log Horizon 2nd Season",
    url: "https://myanimelist.net/anime/23321/Log_Horizon_2nd_Season"
  },
  {
    demographics: [],
    genres: ["Action", "Fantasy", "Supernatural"],
    id: 37675,
    image: "https://cdn.myanimelist.net/images/anime/1511/93473.jpg",
    themes: ["Isekai", "Video Game"],
    title: "Overlord III",
    url: "https://myanimelist.net/anime/37675/Overlord_III"
  }
];

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

describe("Test FavoriteAnimeScreen UI", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<FavoriteAnimeScreen navigation={mockNavigation} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Back Button Works", () => {
    const { getByTestId } = render(
      <FavoriteAnimeScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("backButton"));
    expect(mockBackNavigate).toHaveBeenCalled();
  });

  it("Get Similar Anime Button Works", () => {
    const { getByTestId } = render(
      <FavoriteAnimeScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("23321"));
    expect(mockNavigate).toHaveBeenCalledWith("FavAnimeRecommendation", {
      anime: mockData[0]
    });

    fireEvent.press(getByTestId("37675"));
    expect(mockNavigate).toHaveBeenCalledWith("FavAnimeRecommendation", {
      anime: mockData[1]
    });
  });
});
