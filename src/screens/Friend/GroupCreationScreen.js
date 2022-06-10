import { writeGroupType } from "../../constants/Group";
import WriteGroup from "../../components/Friend/WriteGroup";

const initialState = {
  name: "",
  description: "",
  img: ""
};

const GroupCreationScreen = ({ navigation }) => {
  return (
    <WriteGroup
      type={writeGroupType.CREATE}
      currentState={initialState}
      navigation={navigation}
    />
  );
};

export default GroupCreationScreen;
