import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AnimeCollection from "../../components/Anime/AnimeCollection";
import AnimeFetch, { fetchType } from "../../services/Anime/AnimeFetch";
import AnimeSearchBar from "../../components/Anime/AnimeSearchBar";
import FetchFavoriteAnime from "../../services/Anime/FetchFavoriteAnime";

const AnimeResultScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState(route.params.search);
  const [animeData, setAnimeData] = useState([]);
  const [resultExpanded, setResultExpanded] = useState(null);
  const [resultPage, setResultPage] = useState(1);
  const [favoriteList, setFavoriteList] = useState([]);

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
    if (resultPage == 1) {
      setAnimeData(route.params.data);
    } else {
      const abortController = new AbortController();

      AnimeFetch({
        type: fetchType.SEARCH,
        page: resultPage,
        search: search,
        onSuccesfulFetch: (data) => setAnimeData(data),
        abortController: abortController
      });

      return () => abortController.abort();
    }
  }, [resultPage]);

  return (
    <View style={styles.container}>
      <AnimeSearchBar
        value={search}
        onChangeText={setSearch}
        navigation={navigation}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>

      <AnimeCollection items={animeCollectionItems} favorite={favoriteList} />
    </View>
  );
};

export default AnimeResultScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    alignItems: "center",
    padding: 5,
    flex: 1
  },
  button: {
    alignSelf: "stretch",
    marginVertical: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "aquamarine"
  },
  buttonText: {
    textAlign: "center",
    color: "blue"
  }
});
