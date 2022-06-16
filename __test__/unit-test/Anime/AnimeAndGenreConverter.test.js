import {
  favoriteGenreListToGenreString,
  animeDetailsToGenreString
} from "../../../src/services/Anime/AnimeAndGenreConverter";

describe("Test anime and genre converter", () => {
  test("Empty array must return empty string", () => {
    const genreList = [];
    expect(favoriteGenreListToGenreString(genreList)).toEqual("");
  });

  test("Genre converter must return the combined elements", () => {
    const genreList = ["Action", "Psychological", "Drama"];
    expect(favoriteGenreListToGenreString(genreList)).toEqual(
      "Action, Psychological, Drama"
    );
  });

  test("Empty anime details must return empty string", () => {
    const animeDetails = {
      genres: [],
      themes: [],
      demographics: []
    };
    expect(animeDetailsToGenreString(animeDetails)).toEqual("");
  });

  test("Anime converter must return the combined elements", () => {
    const animeDetails = {
      genres: ["Comedy", "Drama"],
      themes: ["Historical"],
      demographics: ["Seinen"]
    };
    expect(animeDetailsToGenreString(animeDetails)).toEqual(
      "Comedy, Drama, Historical, Seinen"
    );
  });
});
