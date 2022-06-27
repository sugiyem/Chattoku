import RenderCommentScreen from "../../components/Forum/ForumComment/RenderCommentScreen";
import { renderType } from "../../constants/Forum";

const EditCommentScreen = () => {
  return <RenderCommentScreen renderScreenType={renderType.EDIT} />;
};

export default EditCommentScreen;
