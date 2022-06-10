import { writeGroupType } from "../../constants/Group";
import WriteGroup from "../../components/Friend/WriteGroup";

const EditGroupScreen = ({ navigation, route }) => {
  return (
    <WriteGroup
      type={writeGroupType.EDIT}
      currentState={route.params.groupInfo}
      navigation={navigation}
    />
  );
};

export default EditGroupScreen;
