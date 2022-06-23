import RenderCommentScreen from "../../components/Forum/ForumComment/RenderCommentScreen";
import { renderType } from "../../constants/Forum";

const AddCommentScreen = () => {
  return <RenderCommentScreen renderScreenType={renderType.CREATE} />;
};

export default AddCommentScreen;
