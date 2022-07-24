import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { GENRES } from "../../constants/MyAnimeList";
import GenresList from "../../components/Profile/GenresList";
import { ScrollContainer } from "../../styles/GeneralStyles";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import styled from "styled-components/native";

const EditGenreScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [includeFav, setIncludeFav] = useState(true);
  const [includeNonFav, setIncludeNonFav] = useState(true);

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: (data) => {
        setFavorites(data.genres);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  return (
    <ScrollContainer>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="search"
        testID="searchBar"
      />

      <CheckBox
        title="Include favorite"
        checked={includeFav}
        onPress={() => {
          setIncludeFav(!includeFav);
        }}
        containerStyle={styles.checkbox}
        testID="favoriteCheckBox"
      />

      <CheckBox
        title="Include non-favorite"
        checked={includeNonFav}
        onPress={() => {
          setIncludeNonFav(!includeNonFav);
        }}
        containerStyle={styles.checkbox}
        testID="nonFavoriteCheckBox"
      />

      <Button onPress={() => navigation.goBack()} testID="goBack">
        <ButtonText>Go back</ButtonText>
      </Button>

      <Title>Genre lists</Title>
      <View>
        <GenresList
          genres={GENRES.filter((value) =>
            value.toLowerCase().startsWith(search.toLowerCase())
          ).filter((value) =>
            favorites.includes(value) ? includeFav : includeNonFav
          )}
          favorites={favorites}
        />
      </View>
    </ScrollContainer>
  );
};

export default EditGenreScreen;

const TextInput = styled.TextInput`
  border-color: black;
  border-width: 1px;
  margin: 5px;
  background-color: whitesmoke;
  color: black;
  border-radius: 8px;
  padding: 3px 10px;
`;

const Title = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  border-radius: 10px;
  border-width: 1px;
  padding: 5px;
  margin: 5px 0px;
  background-color: aquamarine;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: blue;
`;

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "whitesmoke"
  }
});
