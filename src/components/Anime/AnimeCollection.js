import { SectionList, StyleSheet, View } from "react-native";
import React from "react";
import { ListItem } from "react-native-elements";
import { CenteredBoldText } from "../../styles/GeneralStyles";
import Icon from "react-native-vector-icons/Ionicons";
import AnimeList from "./AnimeList";
import AnimeCard from "./AnimeCard";
import { ANIME_SHOWN_PER_PAGE } from "../../constants/MyAnimeList";

const AnimeCollection = ({ items, favorite }) => {
  const renderItem = ({ section, item }) => {
    const isFavorite = favorite.includes(item.mal_id);

    return (
      <ListItem.Accordion
        bottomDivider
        isExpanded={section.expand == item.mal_id}
        onPress={() =>
          section.changeExpand(
            section.expand == item.mal_id ? null : item.mal_id
          )
        }
        content={<AnimeList item={item} isFavorite={isFavorite} />}
      >
        {section.expand == item.mal_id && (
          <AnimeCard item={item} isFavorite={isFavorite} />
        )}
      </ListItem.Accordion>
    );
  };

  const renderHeader = ({ section }) => (
    <CenteredBoldText underline>{section.title}</CenteredBoldText>
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
    marginBottom: 10
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5
  }
});
