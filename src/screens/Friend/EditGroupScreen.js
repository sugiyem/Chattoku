import { writeSectionType } from "../../constants/Miscellaneous";
import EditSection from "../../components/Miscellaneous/EditSection";

const EditGroupScreen = ({ navigation, route }) => {
  return (
    <EditSection
      type={writeSectionType.EDIT_GROUP}
      currentState={route.params.groupInfo}
      navigation={navigation}
    />
  );
};

export default EditGroupScreen;
