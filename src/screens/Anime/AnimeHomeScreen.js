import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import AnimeCollection from "../../components/Anime/AnimeCollection";
import AnimeFetch from "../../components/Anime/AnimeFetch";
import AnimeSearchBar from "../../components/Anime/AnimeSearchBar";
import FetchFavoriteAnime from "../../components/Anime/FetchFavoriteAnime";

const AnimeHomeScreen = () => {
  const [search, setSearch] = useState("");
  const [airingAnimeData, setAiringAnimeData] = useState([]);
  const [topAnimeData, setTopAnimeData] = useState([]);
  const [airingPage, setAiringPage] = useState(1);
  const [topPage, setTopPage] = useState(1);
  const [airingExpanded, setAiringExpanded] = useState(null);
  const [topExpanded, setTopExpanded] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);

  const navigation = useNavigation();

  const animeCollectionItems = [
    {
      title: "Airing Anime",
      data: airingAnimeData,
      expand: airingExpanded,
      changeExpand: setAiringExpanded,
      page: airingPage,
      changePage: setAiringPage,
    },
    {
      title: "Top Anime",
      data: topAnimeData,
      expand: topExpanded,
      changeExpand: setTopExpanded,
      page: topPage,
      changePage: setTopPage,
    },
  ];

  useEffect(() => {
    return FetchFavoriteAnime({
      onSuccesfulFetch: (favorite) => {
        setFavoriteList(favorite.map((item) => item.id));
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      },
    });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    AnimeFetch({
      type: "Airing",
      page: airingPage,
      onSuccesfulFetch: (data) => {
        setAiringAnimeData(
          data.map((item) => {
            item.isFavorite = favoriteList.includes(item.mal_id);
            return item;
          })
        );
      },
      abortController: abortController,
    });

    return () => abortController.abort();
  }, [airingPage]);

  useEffect(() => {
    const abortController = new AbortController();

    AnimeFetch({
      type: "Top",
      page: topPage,
      onSuccesfulFetch: (data) => {
        setTopAnimeData(
          data.map((item) => {
            item.isFavorite = favoriteList.includes(item.mal_id);
            return item;
          })
        );
      },
      abortController: abortController,
    });

    return () => abortController.abort();
  }, [topPage]);

  return (
    <View style={styles.container}>
      <AnimeSearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        navigation={navigation}
      />

      <AnimeCollection items={animeCollectionItems} favorite={favoriteList} />
    </View>
  );
};

export default AnimeHomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    alignItems: "center",
    padding: 5,
    flex: 1,
  },
});
