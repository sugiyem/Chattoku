import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import RenderFavorites from "../../../src/components/Profile/RenderFavorites";
import {
  removeAnimeFromFavorite,
  removeGenreFromFavorite
} from "../../../src/services/Anime/HandleFavorite";
import { favoriteType } from "../../../src/constants/Favorite";

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate
};
const mockAnimeProps = {
  type: favoriteType.ANIME,
  items: [{ id: 12, title: "Gintama", img: "gintama-img" }],
  navigation: mockNavigation
};
const mockGenreProps = {
  type: favoriteType.GENRE,
  items: ["Comedy"],
  navigation: mockNavigation
};

jest.mock("../../../src/services/Anime/HandleFavorite");

describe("Test Favorite Component UI", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Renders correctly for favorite anime", () => {
    const tree = renderer.create(<RenderFavorites {...mockAnimeProps} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "addButton" }).props.children
    ).toEqual("Add more anime to favorite");
    expect(instance.findByProps({ testID: "title-0" }).props.children).toEqual(
      "Gintama"
    );
  });

  it("Renders correctly for favorite genre", () => {
    const tree = renderer.create(<RenderFavorites {...mockGenreProps} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "addButton" }).props.children
    ).toEqual("Add more genres to favorite");
    expect(instance.findByProps({ testID: "title-0" }).props.children).toEqual(
      "Comedy"
    );
  });

  it("Buttons are working as expected for favorite anime", () => {
    const { getByTestId } = render(<RenderFavorites {...mockAnimeProps} />);

    // Add button is working
    fireEvent.press(getByTestId("addButton"));
    expect(mockNavigate).toHaveBeenCalledWith("Anime");

    // Delete button is working
    fireEvent.press(getByTestId("delete-0"));
    expect(removeAnimeFromFavorite).toHaveBeenCalledWith("12");
  });

  it("Buttons are working as expected for favorite genre", () => {
    const { getByTestId } = render(<RenderFavorites {...mockGenreProps} />);

    // Add button is working
    fireEvent.press(getByTestId("addButton"));
    expect(mockNavigate).toHaveBeenCalledWith("EditGenre");

    // Delete button is working
    fireEvent.press(getByTestId("delete-0"));
    expect(removeGenreFromFavorite).toHaveBeenCalledWith("Comedy");
  });
});
