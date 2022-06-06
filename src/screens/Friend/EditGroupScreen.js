import WriteGroup, { writeType } from "../../components/Friend/WriteGroup";

const EditGroupScreen = ({ navigation, route }) => {
  return (
    <WriteGroup
      type={writeType.EDIT}
      currentState={route.params.groupInfo}
      navigation={navigation}
    />
  );
};

export default EditGroupScreen;
