import axios from "axios";
import AnimeFetch from "../../../src/services/Anime/AnimeFetch";
import {
  AIRING_URL,
  SEARCH_URL,
  TOP_URL,
  BY_ID_URL,
  fetchType
} from "../../../src/constants/MyAnimeList";

jest.mock("axios");

const abortController = new AbortController();

describe("Test anime fetch", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can fetch airing anime", async () => {
    const expectedResults = [
      { title: "Spy x Family" },
      { title: "Paripi Koumei" }
    ];

    const mockResult = { data: { data: expectedResults } };
    axios.get.mockResolvedValue(mockResult);

    let actualResult = [];

    await AnimeFetch({
      type: fetchType.AIRING,
      page: 1,
      onSuccesfulFetch: (data) => {
        actualResult = data;
      },
      abortController: abortController,
      fetcher: axios
    });

    expect(axios.get).toHaveBeenCalledWith(`${AIRING_URL}&page=1`, {
      signal: abortController.signal
    });
    expect(actualResult).toEqual(expectedResults);
  });

  test("Can fetch top anime", async () => {
    const expectedResults = [
      { title: "Fullmetal Alchemist: Brotherhood" },
      { title: "Fruit Basket 3rd Season" }
    ];

    const mockResult = { data: { data: expectedResults } };
    axios.get.mockResolvedValue(mockResult);

    let actualResult = [];

    await AnimeFetch({
      type: fetchType.TOP,
      page: 1,
      onSuccesfulFetch: (data) => {
        actualResult = data;
      },
      abortController: abortController,
      fetcher: axios
    });

    expect(axios.get).toHaveBeenCalledWith(`${TOP_URL}?page=1`, {
      signal: abortController.signal
    });
    expect(actualResult).toEqual(expectedResults);
  });

  test("Can fetch searched anime", async () => {
    const expectedResults = [
      { title: "Kimetsu no Yaiba 1st Season" },
      { title: "Kimetsu no Yaiba 2nd Season" }
    ];

    const mockResult = { data: { data: expectedResults } };
    axios.get.mockResolvedValue(mockResult);

    let actualResult = [];

    await AnimeFetch({
      type: fetchType.SEARCH,
      page: 1,
      search: "kimetsu",
      onSuccesfulFetch: (data) => {
        actualResult = data;
      },
      abortController: abortController,
      fetcher: axios
    });

    expect(axios.get).toHaveBeenCalledWith(`${SEARCH_URL}&page=1&q=kimetsu`, {
      signal: abortController.signal
    });
    expect(actualResult).toEqual(expectedResults);
  });

  test("Can fetch anime by MAL ID", async () => {
    const expectedResults = { title: "Vinland Saga" };

    const mockResult = { data: { data: expectedResults } };
    axios.get.mockResolvedValue(mockResult);

    let actualResult = [];

    await AnimeFetch({
      type: fetchType.BY_ID,
      malID: 2022,
      onSuccesfulFetch: (data) => {
        actualResult = data;
      },
      abortController: abortController,
      fetcher: axios
    });

    expect(axios.get).toHaveBeenCalledWith(`${BY_ID_URL}2022`, {
      signal: abortController.signal
    });
    expect(actualResult).toEqual(expectedResults);
  });
});
