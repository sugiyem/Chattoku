import { StyleSheet, View } from "react-native";
import React from "react";
import {
  ButtonText,
  SearchButton,
  SeparatedSearchInput
} from "../../styles/GeneralStyles";

const AnimeSearchBar = ({
  value,
  onChangeText,
  onPressSearchButton = null,
  navigation
}) => {
  const onSearchClick = () => {
    if (onPressSearchButton) {
      onPressSearchButton();
      return;
    }
    navigation.push("AnimeResult", { search: value });
  };

  return (
    <View style={styles.searchBarContainer}>
      <SeparatedSearchInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search anime by original title"
        testID="searchInput"
      />
      <SearchButton onPress={onSearchClick} testID="searchButton">
        <ButtonText color="#ffffff">Search</ButtonText>
      </SearchButton>
    </View>
  );
};

export default AnimeSearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row"
  }
});
