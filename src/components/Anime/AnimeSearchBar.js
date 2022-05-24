import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import AnimeFetch from "./AnimeFetch";

const AnimeSearchBar = ({ value, onChangeText, navigation }) => {
    const onFinishedFetch = (data) => {
        navigation.push("AnimeResult", {
            data: data,
            search: value,
        });
    };

    return (
        <View style={{ flexDirection: "row" }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Search anime by original title"
                style={styles.textInput}
            />
            <TouchableOpacity
                onPress={() =>
                    AnimeFetch({
                        type: "Search",
                        page: 1,
                        search: value,
                        onSuccesfulFetch: onFinishedFetch,
                    })
                }
                style={styles.button}
            >
                <Text style={{ alignItems: "center" }}>Search</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AnimeSearchBar;

const styles = StyleSheet.create({
    textInput: {
        borderColor: "black",
        borderWidth: 1,
        margin: 5,
        backgroundColor: "white",
        color: "black",
        borderRadius: 10,
        flex: 3,
    },
    button: {
        borderRadius: 10,
        padding: 5,
        margin: 5,
        flex: 1,
        backgroundColor: "darkslateblue",
    },
});