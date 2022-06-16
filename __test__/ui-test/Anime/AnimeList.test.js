import React from "react";
import renderer from "react-test-renderer";
import AnimeList from "../../../src/components/Anime/AnimeList";

const mockItem = {
  title: "Anime",
  score: 8.94,
  episodes: 24,
  airing: false,
  aired: { string: "May 8, 2003" }
};

describe("Test Anime List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <AnimeList item={mockItem} isFavorite={true} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Anime"
    );
    expect(instance.findByProps({ testID: "score" }).props.children).toEqual(
      "MyAnimeList score: 8.94"
    );
    expect(instance.findByProps({ testID: "onAir" }).props.children).toEqual(
      "Aired from: May 8, 2003"
    );
    expect(instance.findByProps({ testID: "episodes" }).props.children).toEqual(
      "Number of episodes: 24"
    );
    expect(instance.findByProps({ testID: "favorite" }).props.children).toEqual(
      "Favorite"
    );
  });
});
