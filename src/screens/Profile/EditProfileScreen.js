import { writeSectionType } from "../../constants/Miscellaneous";
import EditSection from "../../components/Miscellaneous/EditSection";
// route.params.userInfo
const EditProfileScreen = ({ navigation, route }) => {
  return (
    <EditSection
      type={writeSectionType.EDIT_PROFILE}
      currentState={route.params.userInfo}
      navigation={navigation}
    />
  );
};

export default EditProfileScreen;
