import RenderManageForumDetails from "../../components/Forum/RenderManageForumDetails";
import { renderType } from "../../constants/Forum";

const CreateForumScreen = () => {
  return <RenderManageForumDetails manageType={renderType.CREATE} />;
};

export default CreateForumScreen;
