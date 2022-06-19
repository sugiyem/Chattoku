import { useEffect, useState } from "react";
import { FetchInfoById } from "../../../firebase/FetchUserInfo";
import styled from "styled-components/native";
import { StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";

const initialUserData = {
  bio: "",
  img: "",
  username: ""
};

const BannedUser = ({ userId, reason }) => {
  const [userData, setUserData] = useState(initialUserData);
  console.log(userData);

  useEffect(() => {
    FetchInfoById(userId, (data) => setUserData(data));
  }, []);

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
      <Icon name="delete" type="material" color="red" size={40} />
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
