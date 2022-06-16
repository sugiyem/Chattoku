import axios from "axios";
import { Alert } from "react-native";
import { RECOMMENDATIONS_URL } from "../../constants/MyAnimeList";

export default FetchRecommendations = async ({
  genresString,
  onSuccess,
  abortController = new AbortController(),
  fetcher = axios
}) => {
  await fetcher
    .post(
      RECOMMENDATIONS_URL,
      {
        genres: genresString
      },
      { signal: abortController.signal }
    )
    .then((response) => response.data.result)
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => Alert.alert("Error", error.message));
};
