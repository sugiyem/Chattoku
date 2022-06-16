import { writeSectionType } from "../../constants/Miscellaneous";
import EditSection from "../../components/Miscellaneous/EditSection";

const initialState = {
  name: "",
  description: "",
  img: ""
};

const GroupCreationScreen = ({ navigation }) => {
  return (
    <EditSection
      type={writeSectionType.CREATE_GROUP}
      currentState={initialState}
      navigation={navigation}
    />
  );
};

export default GroupCreationScreen;
