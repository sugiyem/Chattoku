import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AnimeScreen from "./AnimeScreen";
import ChatScreen from "./ChatScreen";
import FriendScreen from "./FriendScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: "navy" },
                headerStyle: { backgroundColor: "darkslateblue" },
                headerTitleStyle: { color: "teal" },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Home",
                    tabBarLabelPosition: "below-icon",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="home" color="aquamarine" size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Anime"
                component={AnimeScreen}
                options={{
                    title: "Anime",
                    tabBarLabelPosition: "below-icon",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="ios-library" color="aquamarine" size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    title: "Chat",
                    tabBarLabelPosition: "below-icon",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon
                            name="ios-chatbox-ellipses"
                            color="aquamarine"
                            size={30}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Friend"
                component={FriendScreen}
                options={{
                    title: "Friends",
                    tabBarLabelPosition: "below-icon",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="ios-people" color="aquamarine" size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: "Profile",
                    tabBarLabelPosition: "below-icon",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon
                            name="ios-person-circle"
                            color="aquamarine"
                            size={30}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default DashboardScreen;
