import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import {
  Button,
  ButtonText,
  CenteredBoldText,
  ScrollContainer
} from "../../styles/GeneralStyles";
import FetchFavoriteAnime from "../../services/Anime/FetchFavoriteAnime";

const FavoriteAnimeScreen = ({ navigation }) => {
  const [anime, setAnime] = useState([]);
  const [expand, setExpand] = useState(null);

  const goToRecommendationPage = (item) => {
    navigation.navigate("FavAnimeRecommendation", { anime: item });
  };

  const onRightClick = (index) => {
    if (expand === index) {
      setExpand(null);
    } else {
      setExpand(index);
    }
  };

  const RenderAccordion = ({ item }) => (
    <ListItem bottomDivider onPress={() => goToRecommendationPage(item)}>
      <Icon name="search" size={30} color="green" />
      <ListItem.Content>
        <ListItem.Title>Get similar anime</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  const RenderTab = ({ item }) => (
    <>
      <Avatar
        size="medium"
        source={{ uri: item.image }}
        containerStyle={styles.imageContainer}
      />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
    </>
  );

  useEffect(() => {
    return FetchFavoriteAnime({
      onSuccesfulFetch: (data) => {
        setAnime(data);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  return (
    <ScrollContainer>
      <CenteredBoldText size="20px">Favorite Anime List</CenteredBoldText>

      <Button onPress={() => navigation.goBack()}>
        <ButtonText>Go Back</ButtonText>
      </Button>

      {anime.map((item, idx) => (
        <ListItem.Accordion
          key={idx}
          bottomDivider
          content={<RenderTab item={item} />}
          isExpanded={expand === idx}
          onPress={() => onRightClick(idx)}
        >
          {expand === idx && <RenderAccordion item={item} />}
        </ListItem.Accordion>
      ))}
    </ScrollContainer>
  );
};

export default FavoriteAnimeScreen;

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10,
    height: undefined,
    aspectRatio: 3 / 4
  }
});
