import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React from "react";
import AnimeFetch, { fetchType } from "../../services/Anime/AnimeFetch";

const AnimeSearchBar = ({ value, onChangeText, navigation }) => {
  const onFinishedFetch = (data) => {
    navigation.push("AnimeResult", {
      data: data,
      search: value
    });
  };

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search anime by original title"
        style={styles.textInput}
      />
      <TouchableOpacity
        onPress={() =>
          AnimeFetch({
            type: fetchType.SEARCH,
            page: 1,
            search: value,
            onSuccesfulFetch: onFinishedFetch
          })
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimeSearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row"
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    flex: 3
  },
  button: {
    borderRadius: 10,
    padding: 5,
    margin: 5,
    flex: 1,
    backgroundColor: "darkslateblue"
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  }
});
