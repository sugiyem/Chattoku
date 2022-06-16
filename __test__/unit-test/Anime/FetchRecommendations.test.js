import axios from "axios";
import FetchRecommendations from "../../../src/services/Anime/FetchRecommendations";
import { RECOMMENDATIONS_URL } from "../../../src/constants/MyAnimeList";

jest.mock("axios");

const abortController = new AbortController();

describe("Test recommendation", () => {
  test("Can fetch all IDs of recommended anime", async () => {
    const expectedResults = ["3820", "20212", "50625", "32", "514"];
    const mockResult = { data: { result: expectedResults } };
    axios.post.mockResolvedValue(mockResult);

    let actualResults = [];

    await FetchRecommendations({
      genresString: "Comedy, Romance, School",
      onSuccess: (data) => {
        actualResults = data;
      },
      abortController: abortController,
      fetcher: axios
    });

    expect(axios.post).toHaveBeenCalledWith(
      RECOMMENDATIONS_URL,
      { genres: "Comedy, Romance, School" },
      { signal: abortController.signal }
    );
    expect(actualResults).toEqual(expectedResults);
  });
});
