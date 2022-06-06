import WriteGroup, { writeType } from "../../components/Friend/WriteGroup";

const initialState = {
  name: "",
  description: "",
  img: ""
};

const GroupCreationScreen = ({ navigation }) => {
  return (
    <WriteGroup
      type={writeType.CREATE}
      currentState={initialState}
      navigation={navigation}
    />
  );
};

export default GroupCreationScreen;
