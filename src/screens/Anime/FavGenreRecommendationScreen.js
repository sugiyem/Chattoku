import RenderRecommendation from "../../components/Anime/RenderRecommendation";
import { favoriteType } from "../../constants/Favorite";

const FavGenreRecommendationScreen = ({ navigation, route }) => {
  return (
    <RenderRecommendation
      type={favoriteType.GENRE}
      genreList={route.params.genres}
      navigation={navigation}
    />
  );
};

export default FavGenreRecommendationScreen;
