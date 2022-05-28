import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AnimeHomeScreen from "./AnimeHomeScreen";
import AnimeResultScreen from "./AnimeResultScreen.js";

const Stack = createNativeStackNavigator();

const AnimeScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="AnimeHome"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="AnimeHome" component={AnimeHomeScreen} />
            <Stack.Screen name="AnimeResult" component={AnimeResultScreen} />
        </Stack.Navigator>
    );
};

export default AnimeScreen;
