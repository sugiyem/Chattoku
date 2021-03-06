import { useEffect, useState } from "react";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";
import styled from "styled-components/native";
import { Text } from "react-native";
import { Icon } from "react-native-elements";
import { deleteBannedUsers } from "../../../services/Forum/HandleBannedUsers";
import { useNavigation } from "@react-navigation/native";
import Warning from "../Warning";

const initialUserData = {
  bio: "",
  img: "",
  username: ""
};

const BannedUser = ({ userId, reason, isAuthorized }) => {
  const [userData, setUserData] = useState(initialUserData);
  const navigation = useNavigation();
  const forumId = navigation.getState().routes[1].params.data.id;

  useEffect(() => {
    FetchInfoById(userId, (data) => setUserData(data));
  }, []);

  function handleDelete() {
    Warning(async () => {
      await deleteBannedUsers(forumId, userId);
    });
  }

  return (
    <Card>
      <ProfilePicture
        source={
          userData.img !== ""
            ? { uri: userData.img }
            : require("../../../assets/default-profile.png")
        }
      />
      <InfoContainer>
        <Username> {userData.username} </Username>
        <Text testID="reason"> {reason}</Text>
      </InfoContainer>
      {isAuthorized && (
        <Icon
          name="delete"
          type="material"
          color="red"
          size={40}
          onPress={handleDelete}
          testID="delete"
        />
      )}
    </Card>
  );
};

export default BannedUser;

const Card = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: white;
  margin: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: black;
  align-items: center;
`;

const ProfilePicture = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-self: center;
`;

const InfoContainer = styled.View`
  align-items: center;
  flex: 1;
  height: 100%;
`;

const Username = styled.Text`
  font-size: 18px;
  font-weight: 400;
`;
