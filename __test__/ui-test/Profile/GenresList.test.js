import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import GenresList from "../../../src/components/Profile/GenresList";
import {
  addGenreToFavorite,
  removeGenreFromFavorite
} from "../../../src/services/Anime/HandleFavorite";

jest.mock("../../../src/services/Anime/HandleFavorite");

describe("Test Genre List UI", () => {
  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(
      <GenresList genres={["Action", "Comedy"]} favorites={["Comedy"]} />
    );

    fireEvent.press(getByTestId("edit-Action"));
    expect(addGenreToFavorite).toHaveBeenCalledWith("Action");

    fireEvent.press(getByTestId("edit-Comedy"));
    expect(removeGenreFromFavorite).toHaveBeenCalledWith("Comedy");
  });
});
