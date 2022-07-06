import { useEffect, useState } from "react";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";
import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import { Alert, Dimensions, StyleSheet, Text } from "react-native";
import { removeAdmin } from "../../../services/Forum/HandleForumAdmin";
import { useNavigation } from "@react-navigation/native";
import Warning from "../Warning";
import ManageAdminCard from "./ManageAdminCard";
import { renderType } from "../../../constants/Forum";
import { firebase } from "../../../services/Firebase/Config";

const initialUserData = {
  bio: "",
  img: "",
  username: ""
};

const ForumAdminCard = ({ userId, authorities }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const currentUID = firebase.auth().currentUser.uid;
  const isOwner = forumData.owner === currentUID;
  const forumId = forumData.id;

  console.log(isOwner);

  useEffect(() => {
    FetchInfoById(userId, (data) => setUserData(data));
  }, []);

  if (isEditing) {
    return (
      <ManageAdminCard
        type={renderType.EDIT}
        userData={userData}
        authorities={authorities}
        onSuccessfulEdit={() => setIsEditing(false)}
      />
    );
  }

  const bulletedAuthorities = authorities.map((power) => {
    return (
      <BulletContainer key={power}>
        <Bullet />
        <BulletText> {power} </BulletText>
      </BulletContainer>
    );
  });

  function handleDelete() {
    Warning(() => {
      removeAdmin(
        forumId,
        userId,
        userData.notificationToken,
        forumData.title,
        () =>
          Alert.alert(
            "Success",
            userData.username + " has been removed successfully"
          )
      );
    });
  }

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
      {isOwner && (
        <>
          <Icon
            name="edit"
            type="material"
            color="black"
            size={35}
            iconStyle={styles.icon}
            onPress={() => {
              setIsEditing(true);
            }}
          />
          <Icon
            name="delete"
            type="material"
            color="red"
            size={35}
            iconStyle={styles.icon}
            onPress={handleDelete}
          />
        </>
      )}
    </Card>
  );
};
export default ForumAdminCard;

const width = Dimensions.get("screen").width;

const Card = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  border-color: black;
  align-items: center;
  width: ${width - 40}px;
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

const styles = StyleSheet.create({
  icon: {
    margin: 8
  }
});
