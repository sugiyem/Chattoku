import axios from "axios";
import {
  AIRING_URL,
  SEARCH_URL,
  TOP_URL,
  BY_ID_URL,
  fetchType
} from "../../constants/MyAnimeList";

export default AnimeFetch = async ({
  type,
  page,
  search,
  malID,
  onSuccesfulFetch,
  abortController = new AbortController(),
  fetcher = axios
}) => {
  let url;

  switch (type) {
    case fetchType.SEARCH:
      url = SEARCH_URL + "&page=" + page + "&q=" + search;
      break;
    case fetchType.AIRING:
      url = AIRING_URL + "&page=" + page;
      break;
    case fetchType.TOP:
      url = TOP_URL + "?page=" + page;
      break;
    case fetchType.BY_ID:
      url = BY_ID_URL + malID;
      break;
  }

  await fetcher
    .get(url, { signal: abortController.signal })
    .then((response) => response.data.data)
    .then((data) => {
      onSuccesfulFetch(data);
    })
    .catch((error) => alert(error.message));
};
