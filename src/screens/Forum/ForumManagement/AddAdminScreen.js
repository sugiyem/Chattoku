import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import styled from "styled-components/native";
import GetUserWithUsername from "../../../services/Friend/GetUserWithUsername";
import { isUserBanned } from "../../../services/Forum/HandleBannedUsers";
import { isUserAdmin } from "../../../services/Forum/HandleForumAdmin";
import RenderUserToManage from "../../../components/Forum/ForumManagement/RenderUserToManage";

const initialData = {
  isBanned: false,
  reason: "",
  isAdmin: false,
  authorities: []
};

const AddAdminScreen = () => {
  const [username, setUsername] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [data, setData] = useState(initialData); // For the user forum info
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const forumId = navigation.getState().routes[1].params.data.id;

  function handleChangeText(text) {
    setUsername(text);
  }

  console.log(data);
  console.log(showUserDetails);

  function onSearchPress() {
    GetUserWithUsername({
      specifiedUsername: username,
      onFound: (data) => {
        setUserData(data);
        isUserBanned(forumId, data.id, (result) => {
          setData((data) => {
            return {
              ...data,
              isBanned: result.isFound,
              reason: result.isFound ? result.reason : ""
            };
          });
        });
        isUserAdmin(forumId, data.id, (result) => {
          setData((data) => {
            return {
              ...data,
              isAdmin: result.isFound,
              authorities: result.isFound ? result.authorities : []
            };
          });
        });
      },
      onNotFound: () => {
        setUserData(null);
      }
    }).then(() => setShowUserDetails(true));
  }

  return (
    <Container>
      <Title>Add Forum Admin</Title>
      <SearchContainer>
        <StyledTextInput
          placeholder="Search By Exact Username"
          onChangeText={handleChangeText}
          value={username}
        />
        <CustomButton onPress={onSearchPress}>
          <ButtonText> Search </ButtonText>
        </CustomButton>
      </SearchContainer>
      {showUserDetails && (
        <RenderUserToManage userData={userData} data={data} />
      )}
    </Container>
  );
};

export default AddAdminScreen;

const Container = styled.View`
  display: flex;
  background-color: darkcyan;
  padding: 5px;
  padding-top: 10px;
  flex: 1;
`;

const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  margin-left: 5px;
  font-size: 14px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  background-color: white;
  align-self: center;
`;

const Title = styled.Text`
  font-size: 24px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: white;
`;

const CustomButton = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  padding: 10px;
  background-color: navy;
  margin: 20px;
`;

const ButtonText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 14px;
  font-weight: bold;
  color: white;
`;
