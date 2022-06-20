import { useEffect, useState } from "react";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";
import styled from "styled-components/native";
import { StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";
import { deleteBannedUsers } from "./HandleBannedUsers";
import { useNavigation } from "@react-navigation/native";

const initialUserData = {
  bio: "",
  img: "",
  username: ""
};

const BannedUser = ({ userId, reason }) => {
  const [userData, setUserData] = useState(initialUserData);
  const navigation = useNavigation();
  const forumId = navigation.getState().routes[1].params.data.id;
  console.log(userData);

  console.log(forumId);

  useEffect(() => {
    FetchInfoById(userId, (data) => setUserData(data));
  }, []);

  function handleDelete() {
    deleteBannedUsers(forumId, userId);
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
        <Text> {reason}</Text>
      </InfoContainer>
      <Icon
        name="delete"
        type="material"
        color="red"
        size={40}
        onPress={handleDelete}
      />
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
