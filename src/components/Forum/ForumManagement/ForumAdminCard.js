import { useEffect, useState } from "react";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";
import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import { Text } from "react-native";

const initialUserData = {
  bio: "",
  img: "",
  username: ""
};

const ForumAdminCard = ({ userId, authorities }) => {
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    FetchInfoById(userId, (data) => setUserData(data));
  }, []);

  const bulletedAuthorities = authorities.map((power) => {
    return (
      <BulletContainer key={power}>
        <Bullet />
        <BulletText> {power} </BulletText>
      </BulletContainer>
    );
  });

  function handleDelete() {}

  return (
    <Card>
      <InfoContainer>
        <UserDetails>
          <ProfilePicture
            source={
              userData.img !== ""
                ? { uri: userData.img }
                : require("../../../assets/default-profile.png")
            }
          />
          <Username> {userData.username} </Username>
        </UserDetails>
        <BulletText> This User Can: </BulletText>
        {bulletedAuthorities}
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
export default ForumAdminCard;

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
  width: 100%;
`;

const UserDetails = styled.View`
  font-size: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  align-self: stretch;
  margin-bottom: 12px;
`;

const ProfilePicture = styled.Image`
  align-self: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: white;
`;

const InfoContainer = styled.View`
  align-items: flex-start;
  flex: 1;
  height: 100%;
`;

const Username = styled.Text`
  font-size: 18px;
  font-weight: 400;
`;

const BulletContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  justify-content: flex-start;
  margin: 2px;
`;

const Bullet = styled.View`
  margin: 5px;
  border-radius: 20px;
  background-color: black;
  width: 10px;
  height: 10px;
`;

const BulletText = styled.Text`
  font-size: 16px;
`;
