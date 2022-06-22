import RenderManageForumDetails from "../../../components/Forum/RenderManageForumDetails";
import { manageForumDetailsType } from "../../../constants/Forum";

const ForumEditScreen = () => {
  return <RenderManageForumDetails manageType={manageForumDetailsType.EDIT} />;
};

export default ForumEditScreen;
