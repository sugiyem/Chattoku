import { View } from "react-native";
import React from "react";
import { ListItem, Icon } from "react-native-elements";
import { favoriteType } from "../../constants/Favorite";
import styled from "styled-components/native";
import {
  removeAnimeFromFavorite,
  removeGenreFromFavorite
} from "../../services/Anime/HandleFavorite";

const RenderFavorites = ({ type, items, navigation = null }) => {
  const isGenre = type === favoriteType.GENRE;

  function handleDelete(item) {
    isGenre
      ? removeGenreFromFavorite(item)
      : removeAnimeFromFavorite(item.id.toString());
  }

  return (
    <View>
      <AddButton
        onPress={() => {
          if (isGenre) {
            navigation.navigate("EditGenre");
          } else {
            navigation.navigate("Anime");
          }
        }}
      >
        <ButtonText>
          {isGenre
            ? "Add more genres to favorite"
            : "Add more anime to favorite"}
        </ButtonText>
      </AddButton>

      {items.map((item, i) => (
        <Card key={i}>
          {!isGenre && <Visual source={{ uri: item.image }} />}
          <ListItem.Content>
            <Title>{isGenre ? item : item.title}</Title>
          </ListItem.Content>
          <DeleteIcon onPress={() => handleDelete(item)}>
            <Icon name="delete" type="material" size={30} color="#c10015" />
          </DeleteIcon>
        </Card>
      ))}
      <Margin />
    </View>
  );
};

export default RenderFavorites;

const Card = styled.View`
  background-color: whitesmoke;
  align-items: center;
  flex-direction: row;
  padding: 15px;
  border-color: black;
  border-width: 0.5px;
`;

const DeleteIcon = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 25px;
`;

const Title = styled.Text`
  align-items: center;
  font-size: 16px;
`;

const Visual = styled.Image`
  width: 60px;
  height: 80px;
  margin-right: 10px;
`;

const Margin = styled.View`
  margin: 10px;
`;

const AddButton = styled.TouchableOpacity`
  margin: 15px 5px;
  padding: 10px;
  background-color: turquoise;
  border-color: navy;
  border-width: 1px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: navy;
  text-align: center;
`;
