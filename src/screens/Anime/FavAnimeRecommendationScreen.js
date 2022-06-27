import RenderRecommendation from "../../components/Anime/RenderRecommendation";
import { favoriteType } from "../../constants/Favorite";

const FavAnimeRecommendationScreen = ({ navigation, route }) => {
  return (
    <RenderRecommendation
      type={favoriteType.ANIME}
      sourceAnime={route.params.anime}
      navigation={navigation}
    />
  );
};

export default FavAnimeRecommendationScreen;
