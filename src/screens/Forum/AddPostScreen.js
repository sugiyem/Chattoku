import RenderPostScreen from "../../components/Forum/ForumPost/RenderPostScreen";
import { renderType } from "../../constants/Forum";

const AddPostScreen = () => {
  return <RenderPostScreen renderScreenType={renderType.CREATE} />;
};

export default AddPostScreen;
