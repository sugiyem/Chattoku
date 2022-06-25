import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, ButtonText, Container } from "../../styles/GeneralStyles";

import AnimeCollection from "../../components/Anime/AnimeCollection";
import AnimeFetch from "../../services/Anime/AnimeFetch";
import AnimeSearchBar from "../../components/Anime/AnimeSearchBar";
import FetchFavoriteAnime from "../../services/Anime/FetchFavoriteAnime";
import Loading from "../../components/Miscellaneous/Loading";
import { fetchType } from "../../constants/MyAnimeList";

const AnimeHomeScreen = () => {
  const [search, setSearch] = useState("");
  const [airingAnimeData, setAiringAnimeData] = useState([]);
  const [topAnimeData, setTopAnimeData] = useState([]);
  const [airingPage, setAiringPage] = useState(1);
  const [topPage, setTopPage] = useState(1);
  const [airingExpanded, setAiringExpanded] = useState(null);
  const [topExpanded, setTopExpanded] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isAiringLoaded, setIsAiringLoaded] = useState(false);
  const [isTopLoaded, setIsTopLoaded] = useState(false);

  const navigation = useNavigation();

  const animeCollectionItems = [
    {
      title: "Airing Anime",
      data: airingAnimeData,
      expand: airingExpanded,
      changeExpand: setAiringExpanded,
      page: airingPage,
      changePage: setAiringPage
    },
    {
      title: "Top Anime",
      data: topAnimeData,
      expand: topExpanded,
      changeExpand: setTopExpanded,
      page: topPage,
      changePage: setTopPage
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
    setIsAiringLoaded(false);

    AnimeFetch({
      type: fetchType.AIRING,
      page: airingPage,
      onSuccesfulFetch: (data) => {
        setAiringAnimeData(
          data.map((item) => {
            item.isFavorite = favoriteList.includes(item.mal_id);
            return item;
          })
        );
        setIsAiringLoaded(true);
      },
      abortController: abortController
    });

    return () => abortController.abort();
  }, [airingPage]);

  useEffect(() => {
    const abortController = new AbortController();
    setIsTopLoaded(false);

    AnimeFetch({
      type: fetchType.TOP,
      page: topPage,
      onSuccesfulFetch: (data) => {
        setTopAnimeData(
          data.map((item) => {
            item.isFavorite = favoriteList.includes(item.mal_id);
            return item;
          })
        );
        setIsTopLoaded(true);
      },
      abortController: abortController
    });

    return () => abortController.abort();
  }, [topPage]);

  if (!(isAiringLoaded && isTopLoaded)) {
    return <Loading />;
  }

  return (
    <Container>
      <AnimeSearchBar
        value={search}
        onChangeText={setSearch}
        navigation={navigation}
      />

      <Button
        onPress={() => navigation.navigate("Recommendation")}
        color="#00ffff"
      >
        <ButtonText>Find Recommendations</ButtonText>
      </Button>

      <AnimeCollection items={animeCollectionItems} favorite={favoriteList} />
    </Container>
  );
};

export default AnimeHomeScreen;
