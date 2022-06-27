import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AnimeHomeScreen from "./AnimeHomeScreen";
import AnimeResultScreen from "./AnimeResultScreen.js";
import RecommendationScreen from "./RecommendationScreen";
import FavoriteAnimeScreen from "./FavoriteAnimeScreen";
import FavAnimeRecommendationScreen from "./FavAnimeRecommendationScreen";
import FavGenreRecommendationScreen from "./FavGenreRecommendationScreen";

const Stack = createNativeStackNavigator();

const AnimeScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="AnimeHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AnimeHome" component={AnimeHomeScreen} />
      <Stack.Screen name="AnimeResult" component={AnimeResultScreen} />
      <Stack.Screen name="Recommendation" component={RecommendationScreen} />
      <Stack.Screen name="FavoriteAnime" component={FavoriteAnimeScreen} />
      <Stack.Screen
        name="FavAnimeRecommendation"
        component={FavAnimeRecommendationScreen}
      />
      <Stack.Screen
        name="FavGenreRecommendation"
        component={FavGenreRecommendationScreen}
      />
    </Stack.Navigator>
  );
};

export default AnimeScreen;
