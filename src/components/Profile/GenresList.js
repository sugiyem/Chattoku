import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import {
  addGenreToFavorite,
  removeGenreFromFavorite
} from "../../services/Anime/HandleFavorite";

const GenresList = ({ genres, favorites }) => {
  const objectifiedFavorites = {};
  favorites.forEach((genre) => {
    //For performance
    objectifiedFavorites[genre] = true;
  });

  function handleFavoriteClick(genre, isFavorite) {
    if (isFavorite) {
      removeGenreFromFavorite(genre);
    } else {
      addGenreToFavorite(genre);
    }
  }

  return (
    <>
      {genres.map((genre) => {
        const isFavorite = objectifiedFavorites[genre];
        const iconName = isFavorite ? "grade" : "star-border";
        const iconColor = isFavorite ? "#ffcc00" : "grey";

        return (
          <Card key={genre}>
            <Title> {genre} </Title>
            <StarIcon
              onPress={() => {
                handleFavoriteClick(genre, isFavorite);
              }}
            >
              <Icon name={iconName} size={40} color={iconColor} />
            </StarIcon>
          </Card>
        );
      })}
    </>
  );
};

export default GenresList;

const Card = styled.View`
  background-color: whitesmoke;
  align-items: center;
  flex-direction: row;
  padding: 15px;
  border-color: black;
  border-width: 0.5px;
`;

const Title = styled.Text`
  align-items: center;
  font-size: 16px;
  flex: 1;
`;

const StarIcon = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 25px;
`;
