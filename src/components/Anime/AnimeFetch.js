import axios from "axios";
import { AIRING_URL, SEARCH_URL, TOP_URL } from "../../constants/MyAnimeList";

export const fetchType = {
  SEARCH: 0,
  AIRING: 1,
  TOP: 2,
};

export default AnimeFetch = async ({
  type,
  page,
  search,
  onSuccesfulFetch,
  abortController = new AbortController(),
}) => {
  let url;

  switch (type) {
    case 0:
      url = SEARCH_URL + "&page=" + page + "&q=" + search;
      break;
    case 1:
      url = AIRING_URL + "&page=" + page;
      break;
    case 2:
      url = TOP_URL + "?page=" + page;
      break;
  }

  await axios
    .get(url, { signal: abortController.signal })
    .then((response) => response.data.data)
    .then((data) => {
      onSuccesfulFetch(data);
    })
    .catch((error) => alert(error.message));
};
