import RenderManageForumDetails from "../../components/Forum/RenderManageForumDetails";
import { manageForumDetailsType } from "../../constants/Forum";

const CreateForumScreen = () => {
  return (
    <RenderManageForumDetails manageType={manageForumDetailsType.CREATE} />
  );
};

export default CreateForumScreen;
