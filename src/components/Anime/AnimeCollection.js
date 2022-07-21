import { SectionList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ListItem } from "react-native-elements";
import { CenteredBoldText } from "../../styles/GeneralStyles";
import Icon from "react-native-vector-icons/Ionicons";
import AnimeList from "./AnimeList";
import AnimeCard from "./AnimeCard";
import { ANIME_SHOWN_PER_PAGE } from "../../constants/MyAnimeList";

const AnimeCollection = ({ items, favorite }) => {
  const renderItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isFavorite = favorite.includes(item.mal_id);

    return (
      <ListItem.Accordion
        bottomDivider
        isExpanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        content={<AnimeList item={item} isFavorite={isFavorite} />}
        style={styles.accordion}
      >
        {isExpanded && <AnimeCard item={item} isFavorite={isFavorite} />}
      </ListItem.Accordion>
    );
  };

  const renderHeader = ({ section }) => (
    <CenteredBoldText underline style={styles.header}>
      {section.title}
    </CenteredBoldText>
  );

  const renderFooter = ({ section }) => (
    <View style={styles.footerContainer}>
      <View>
        {section.page > 1 && (
          <Icon
            name="arrow-undo"
            color="midnightblue"
            onPress={() => section.changePage(section.page - 1)}
            size={30}
          />
        )}
      </View>

      <View>
        {section.data.length == ANIME_SHOWN_PER_PAGE && (
          <Icon
            name="arrow-redo"
            color="midnightblue"
            onPress={() => section.changePage(section.page + 1)}
            size={30}
          />
        )}
      </View>
    </View>
  );

  return (
    <SectionList
      style={styles.container}
      removeClippedSubviews={true}
      maxToRenderPerBatch={60}
      windowSize={30}
      sections={items}
      keyExtractor={(item) => item.mal_id}
      renderItem={renderItem}
      renderSectionHeader={renderHeader}
      renderSectionFooter={renderFooter}
    />
  );
};

export default AnimeCollection;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    paddingHorizontal: 5,
    margin: 5
  },
  header: {
    marginBottom: 20
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5
  },
  accordion: {
    borderWidth: 0.5,
    borderColor: "black"
  }
});
