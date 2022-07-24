import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  Button,
  ButtonText,
  CenteredBoldText,
  ScrollContainer,
  SeparatedButton
} from "../../styles/GeneralStyles";
import AnimeCard from "./AnimeCard";
import FetchRecommendations from "../../services/Anime/FetchRecommendations";
import FetchFavoriteAnime from "../../services/Anime/FetchFavoriteAnime";
import Loading from "../Miscellaneous/Loading";
import { fetchType } from "../../constants/MyAnimeList";
import { favoriteType } from "../../constants/Favorite";
import {
  favoriteGenreListToGenreString,
  animeDetailsToGenreString
} from "../../services/Anime/AnimeAndGenreConverter";

const RenderRecommendation = ({
  type,
  genreList,
  sourceAnime = null,
  navigation
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationCount, setRecommendationCount] = useState(undefined);
  const [animeData, setAnimeData] = useState(null);
  const [favoriteAnimeID, setFavoriteAnimeID] = useState([]);
  const [isRecommendationFound, setIsRecommendationFound] = useState(false);
  const [isAnimeDataLoaded, setIsAnimeDataLoaded] = useState(true);

  const isCalledFromFavoriteAnime = type === favoriteType.ANIME;

  const increaseCount = () => {
    setRecommendationCount(recommendationCount + 1);
  };

  const decreaseCount = () => {
    setRecommendationCount(recommendationCount - 1);
  };

  useEffect(() => {
    return FetchFavoriteAnime({
      onSuccesfulFetch: (data) => {
        setFavoriteAnimeID(data.map((item) => item.id));
      },
      onFailure: (error) => {
        if (error.message === "canceled") {
          return;
        }
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    setIsRecommendationFound(false);

    FetchRecommendations({
      genresString: isCalledFromFavoriteAnime
        ? animeDetailsToGenreString(sourceAnime)
        : favoriteGenreListToGenreString(genreList),
      onSuccess: (data) => {
        if (isCalledFromFavoriteAnime) {
          data = data.filter((item) => item != sourceAnime.id.toString());
        }
        setRecommendations(data);
        setIsRecommendationFound(true);
      },
      abortController: abortController
    });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (recommendations.length > 0) {
      setRecommendationCount(0);
    }
  }, [recommendations]);

  useEffect(() => {
    if (recommendationCount === undefined) {
      setAnimeData(null);
      return;
    }

    const abortController = new AbortController();
    setIsAnimeDataLoaded(false);

    AnimeFetch({
      type: fetchType.BY_ID,
      malID: recommendations[recommendationCount],
      onSuccesfulFetch: (data) => {
        setAnimeData(data);
        setIsAnimeDataLoaded(true);
      },
      abortController: abortController
    });

    return () => abortController.abort();
  }, [recommendations, recommendationCount]);

  const isPageLoading = !(isRecommendationFound && isAnimeDataLoaded);

  const RenderPage = () => (
    <ScrollContainer>
      <CenteredBoldText size="20px">
        {isCalledFromFavoriteAnime
          ? "Anime similar to " + sourceAnime.title
          : "Anime which has similar theme to your favorite genres"}
      </CenteredBoldText>

      <Button onPress={() => navigation.goBack()} testID="backButton">
        <ButtonText>Go Back</ButtonText>
      </Button>

      <View style={styles.buttonGroup}>
        {recommendationCount > 0 && (
          <SeparatedButton onPress={decreaseCount} testID="decreaseButton">
            <ButtonText size="12px">Previous recommendation</ButtonText>
          </SeparatedButton>
        )}
        {recommendationCount < recommendations.length - 1 && (
          <SeparatedButton onPress={increaseCount} testID="increaseButton">
            <ButtonText size="12px">Next recommendation</ButtonText>
          </SeparatedButton>
        )}
      </View>

      {animeData && (
        <AnimeCard
          item={animeData}
          isFavorite={favoriteAnimeID.includes(animeData.mal_id)}
        />
      )}
    </ScrollContainer>
  );

  return (
    <Loading isLoading={isPageLoading}>
      <RenderPage />
    </Loading>
  );
};

export default RenderRecommendation;

const styles = StyleSheet.create({
  buttonGroup: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    flexDirection: "row"
  }
});
