import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import AnimeCollection from "../../components/Anime/AnimeCollection";
import AnimeFetch from "../../components/Anime/AnimeFetch";
import AnimeSearchBar from "../../components/Anime/AnimeSearchBar";

const AnimeSearchResultScreen = ({ navigation, route }) => {
    const [search, setSearch] = useState(route.params.search);
    const [animeData, setAnimeData] = useState([]);
    const [resultExpanded, setResultExpanded] = useState(null);
    const [resultPage, setResultPage] = useState(1);

    const animeCollectionItems = [
        {
            title: "Search Result",
            data: animeData,
            expand: resultExpanded,
            changeExpand: setResultExpanded,
            page: resultPage,
            changePage: setResultPage,
        },
    ];

    useEffect(() => {
        if (resultPage == 1) {
            setAnimeData(route.params.data);
        } else {
            const abortController = new AbortController();

            AnimeFetch({
                type: "Search",
                page: resultPage,
                search: search,
                onSuccesfulFetch: (data) => setAnimeData(data),
                abortController: abortController,
            });

            return () => abortController.abort();
        }
    }, [resultPage]);

    return (
        <View style={styles.container}>
            <AnimeSearchBar
                value={search}
                onChangeText={(text) => setSearch(text)}
                navigation={navigation}
            />

            <AnimeCollection items={animeCollectionItems} />
        </View>
    );
};

export default AnimeSearchResultScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "darkcyan",
        alignItems: "center",
        padding: 5,
        flex: 1,
    },
});
