import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import {
  addAnimeToFavorite,
  removeAnimeFromFavorite
} from "../../services/Anime/HandleFavorite";
import { animeDetailsToGenreString } from "../../services/Anime/AnimeAndGenreConverter";
import styled from "styled-components/native";

const AnimeCard = ({ item, isFavorite, onEdit = null, onOpenURL = null }) => {
  const cleanedItem = {
    ...item,
    images: item.images.jpg.image_url,
    genres: item.genres.map((value) => value.name),
    themes: item.themes.map((value) => value.name),
    demographics: item.demographics.map((value) => value.name)
  };

  const onEditFavoritePress = () => {
    if (onEdit) {
      onEdit();
      return;
    }

    if (isFavorite) {
      removeAnimeFromFavorite(item.mal_id.toString());
    } else {
      addAnimeToFavorite(item);
    }
  };

  const onOpenURLPress = () => {
    if (onOpenURL) {
      onOpenURL();
      return;
    }

    Linking.openURL(cleanedItem.url);
  };

  return (
    <Container>
      <HeaderContainer>
        <Visual source={{ uri: cleanedItem.images }} />
        <InfoContainer>
          <Title testID="title">{cleanedItem.title}</Title>
          <Divider />
          <BoldText>Genres: </BoldText>
          <Text testID="genres">{animeDetailsToGenreString(cleanedItem)}</Text>
        </InfoContainer>
      </HeaderContainer>
      <View>
        <ActionButton
          color="#ADD8E6"
          testID="editFavorite"
          onPress={onEditFavoritePress}
        >
          <ActionText>
            {isFavorite
              ? "Remove this anime from favorite"
              : "Add this anime to favorite"}
          </ActionText>
        </ActionButton>
        <BoldText size="20px">Synopsis:</BoldText>
        <Synopsis testID="synopsis">{cleanedItem.synopsis}</Synopsis>
        <ActionButton testID="openURL" onPress={onOpenURLPress}>
          <ActionText>Click here for more information!</ActionText>
        </ActionButton>
      </View>
    </Container>
  );
};

export default AnimeCard;

const width = Dimensions.get("screen").width;

const Container = styled.View`
  padding: 15px;
  margin: 20px 5px;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled.Text`
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  width: 100%;
`;

const Divider = styled.View`
  background-color: black;
  height: 1px;
  margin: 5px 0px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-left: 20px;
  height: 100%;
`;

const BoldText = styled.Text`
  font-weight: 500;
  margin: 5px 0px;
  font-size: 17px;
`;

const Synopsis = styled.Text`
  font-size: 14px;
`;

const Visual = styled.Image`
  width: ${(3 / 10) * width}px;
  height: ${(4 / 10) * width}px;
`;

const ActionButton = styled.TouchableOpacity`
  margin: 10px 0px;
  background-color: navy;
  border-radius: 15px;
  border-width: 2px;
  border-color: lightblue;
  padding: 5px;
`;

const ActionText = styled.Text`
  color: lightblue;
  text-align: center;
  font-size: 16px;
`;
