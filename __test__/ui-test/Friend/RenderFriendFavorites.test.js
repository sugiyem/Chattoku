import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import RenderFriendFavorites from "../../../src/components/Friend/RenderFriendFavorites";
import { favoriteType } from "../../../src/constants/Favorite";

const mockAnimeData = [
  {
    title: "Fullmetal Alchemist",
    img: "fmab-img"
  }
];
const mockGenreData = ["Psychological"];

describe("Test Friend's Favorite List UI", () => {
  it("Renders correctly for anime list", () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <RenderFriendFavorites
        type={favoriteType.ANIME}
        title="Favorite Anime"
        data={mockAnimeData}
      />
    );

    expect(getByText("Favorite Anime")).toBeTruthy();

    // Before pressing the accordion, items are not visible
    expect(queryByTestId("title-0")).toBeNull();
    expect(queryByTestId("avatar-0")).toBeNull();

    fireEvent.press(getByTestId("accordion"));

    // After pressing the accordion, items become visible
    expect(getByTestId("title-0")).toBeTruthy();
    expect(getByTestId("avatar-0")).toBeTruthy();
    expect(getByText("Fullmetal Alchemist")).toBeTruthy();
  });

  it("Renders correctly for genre list", () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <RenderFriendFavorites
        type={favoriteType.GENRE}
        title="Favorite Genre"
        data={mockGenreData}
      />
    );

    expect(getByText("Favorite Genre")).toBeTruthy();

    // Before pressing the accordion, items are not visible
    expect(queryByTestId("title-0")).toBeNull();
    expect(queryByTestId("avatar-0")).toBeNull();

    fireEvent.press(getByTestId("accordion"));

    // After pressing the accordion, items become visible
    expect(getByTestId("title-0")).toBeTruthy();
    expect(getByText("Psychological")).toBeTruthy();

    // Avatar is always not visible in genre list
    expect(queryByTestId("avatar-0")).toBeNull();
  });
});
