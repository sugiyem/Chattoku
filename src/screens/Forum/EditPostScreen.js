import RenderPostScreen from "../../components/Forum/ForumPost/RenderPostScreen";
import { renderType } from "../../constants/Forum";

const EditPostScreen = () => {
  return <RenderPostScreen renderScreenType={renderType.EDIT} />;
};

export default EditPostScreen;
