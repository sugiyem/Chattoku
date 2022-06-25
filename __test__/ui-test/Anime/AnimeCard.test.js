import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import AnimeCard from "../../../src/components/Anime/AnimeCard";

const mockItem = {
  mal_id: 1,
  title: "Anime",
  synopsis: "This is an anime",
  genres: [{ name: "genre" }],
  themes: [{ name: "theme" }],
  demographics: [{ name: "demo" }],
  images: { jpg: { image_url: "anime-image-url" } }
};

describe("Test Anime Card UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <AnimeCard item={mockItem} isFavorite={true} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Anime"
    );
    expect(instance.findByProps({ testID: "synopsis" }).props.children).toEqual(
      "This is an anime"
    );
    expect(instance.findByProps({ testID: "genres" }).props.children).toEqual(
      "genre, theme, demo"
    );
  });

  it("Buttons are pressable", () => {
    const mockPressEditFavorite = jest.fn();
    const mockPressOpenURL = jest.fn();

    const { getByTestId } = render(
      <AnimeCard
        item={mockItem}
        isFavorite={true}
        onEdit={mockPressEditFavorite}
        onOpenURL={mockPressOpenURL}
      />
    );

    fireEvent.press(getByTestId("editFavorite"));
    fireEvent.press(getByTestId("openURL"));

    expect(mockPressEditFavorite).toHaveBeenCalled();
    expect(mockPressOpenURL).toHaveBeenCalled();
  });
});
