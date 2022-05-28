import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AnimeScreen from "./Anime/AnimeScreen";
import ChatScreen from "./ChatScreen";
import FriendScreen from "./FriendScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const screenLists = [
    {
        name: "Home",
        component: HomeScreen,
        icon: "home",
    },
    {
        name: "Anime",
        component: AnimeScreen,
        icon: "ios-library",
    },
    {
        name: "Chat",
        component: ChatScreen,
        icon: "ios-chatbox-ellipses",
    },
    {
        name: "Friends",
        component: FriendScreen,
        icon: "ios-people",
    },
    {
        name: "Profile",
        component: ProfileScreen,
        icon: "ios-person-circle",
    },
];

const DashboardScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: "navy" },
                headerStyle: { backgroundColor: "darkslateblue" },
                headerTitleStyle: { color: "teal" },
            }}
        >
            {screenLists.map((item) => (
                <Tab.Screen
                    name={item.name}
                    component={item.component}
                    key={item.name}
                    options={{
                        title: item.title,
                        tabBarLabelPosition: "below-icon",
                        tabBarIcon: ({ tintColor }) => (
                            <Icon
                                name={item.icon}
                                color="aquamarine"
                                size={30}
                            />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default DashboardScreen;
