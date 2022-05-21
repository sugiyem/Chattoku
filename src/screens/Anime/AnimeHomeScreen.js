import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import AnimeCollection from "../../components/Anime/AnimeCollection";
import AnimeFetch from "../../components/Anime/AnimeFetch";
import AnimeSearchBar from "../../components/Anime/AnimeSearchBar";

const AnimeHomeScreen = () => {
    const [search, setSearch] = useState("");
    const [airingAnimeData, setAiringAnimeData] = useState([]);
    const [topAnimeData, setTopAnimeData] = useState([]);
    const [airingPage, setAiringPage] = useState(1);
    const [topPage, setTopPage] = useState(1);
    const [airingExpanded, setAiringExpanded] = useState(null);
    const [topExpanded, setTopExpanded] = useState(null);

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
            title: "TopAnime",
            data: topAnimeData,
            expand: topExpanded,
            changeExpand: setTopExpanded,
            page: topPage,
            changePage: setTopPage,
        },
    ];

    useEffect(() => {
        const abortController = new AbortController();

        AnimeFetch({
            type: "Airing",
            page: airingPage,
            onSuccesfulFetch: (data) => setAiringAnimeData(data),
            abortController: abortController,
        });

        return () => abortController.abort();
    }, [airingPage]);

    useEffect(() => {
        const abortController = new AbortController();

        AnimeFetch({
            type: "Top",
            page: topPage,
            onSuccesfulFetch: (data) => setTopAnimeData(data),
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

            <AnimeCollection items={animeCollectionItems} />
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
