import RenderManageForumDetails from "../../../components/Forum/RenderManageForumDetails";
import { renderType } from "../../../constants/Forum";

const ForumEditScreen = () => {
  return <RenderManageForumDetails manageType={renderType.EDIT} />;
};

export default ForumEditScreen;
