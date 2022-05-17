import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AnimeScreen from "./src/screens/AnimeScreen";
import ChatScreen from "./src/screens/ChatScreen";
import FriendScreen from "./src/screens/FriendScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <StatusBar style="light" />
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
                            <Icon
                                name="ios-library"
                                color="aquamarine"
                                size={30}
                            />
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
                            <Icon
                                name="ios-people"
                                color="aquamarine"
                                size={30}
                            />
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
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "aquamarine",
        alignItems: "center",
        justifyContent: "center",
    },
});
