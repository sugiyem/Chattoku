import React, { useEffect, useState } from "react";
import { Button, ButtonText, Container } from "../../styles/GeneralStyles";

import AnimeCollection from "../../components/Anime/AnimeCollection";
import AnimeFetch from "../../services/Anime/AnimeFetch";
import AnimeSearchBar from "../../components/Anime/AnimeSearchBar";
import FetchFavoriteAnime from "../../services/Anime/FetchFavoriteAnime";
import Loading from "../../components/Miscellaneous/Loading";
import { fetchType } from "../../constants/MyAnimeList";

const AnimeResultScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState(route.params.search);
  const [animeData, setAnimeData] = useState([]);
  const [resultExpanded, setResultExpanded] = useState(null);
  const [resultPage, setResultPage] = useState(1);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isResultLoaded, setIsResultLoaded] = useState(false);

  const animeCollectionItems = [
    {
      title: "Search Result",
      data: animeData,
      expand: resultExpanded,
      changeExpand: setResultExpanded,
      page: resultPage,
      changePage: setResultPage
    }
  ];

  useEffect(() => {
    return FetchFavoriteAnime({
      onSuccesfulFetch: (favorite) => {
        setFavoriteList(favorite.map((item) => item.id));
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    setIsResultLoaded(false);

    AnimeFetch({
      type: fetchType.SEARCH,
      page: resultPage,
      search: search,
      onSuccesfulFetch: (data) => {
        setAnimeData(data);
        setIsResultLoaded(true);
      },
      abortController: abortController
    });

    return () => abortController.abort();
  }, [resultPage]);

  const isPageLoading = !isResultLoaded;

  return (
    <Loading isLoading={isPageLoading}>
      <Container>
        <AnimeSearchBar
          value={search}
          onChangeText={setSearch}
          navigation={navigation}
        />

        <Button onPress={() => navigation.goBack()} testID="backButton">
          <ButtonText>Go back</ButtonText>
        </Button>

        <AnimeCollection items={animeCollectionItems} favorite={favoriteList} />
      </Container>
    </Loading>
  );
};

export default AnimeResultScreen;
