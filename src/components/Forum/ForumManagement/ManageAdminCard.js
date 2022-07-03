import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert, Dimensions, Text } from "react-native";
import { AdminPower } from "../../../constants/Admin";
import Selector from "../../Miscellaneous/Selector";
import {
  addAdmin,
  editAdminPower
} from "../../../services/Forum/HandleForumAdmin";
import { useNavigation } from "@react-navigation/native";
import { renderType } from "../../../constants/Forum";

const ManageAdminCard = ({ userData, type, authorities, onSuccessfulEdit }) => {
  const [selected, setSelected] = useState(
    type === renderType.CREATE ? [] : authorities
  );
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const forumId = forumData.id;
  const successMessage =
    type === renderType.CREATE ? "Authorization Success" : "Edit Success";

  console.log(selected);

  const AuthoritiesSelection = AdminPower.map((power) => {
    let isSelected = selected.includes(power);

    function onChange() {
      if (isSelected) {
        setSelected(selected.filter((x) => x !== power));
      } else {
        setSelected([...selected, power]);
      }
    }

    return (
      <BulletContainer key={power}>
        <Selector onPress={onChange} isChosen={isSelected} />
        <BulletText> {power} </BulletText>
      </BulletContainer>
    );
  });

  function handleSubmit() {
    if (selected.length === 0) {
      Alert.alert(
        "Invalid Selection",
        "Plese Select At Least One Authorization"
      );
      return;
    }
    if (type === renderType.CREATE) {
      addAdmin(
        forumId,
        { uid: userData.id, authorities: selected },
        userData.notificationToken,
        forumData.title,
        () => {
          Alert.alert(successMessage);
        }
      );
    } else {
      editAdminPower(forumId, userData.id, selected, () => {
        Alert.alert(successMessage);
        onSuccessfulEdit();
      });
    }
  }

  return (
    <Card>
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
      <BulletText> Choose Authorization: </BulletText>
      {AuthoritiesSelection}
      <CustomButton onPress={handleSubmit}>
        <ButtonText>
          {type === renderType.CREATE
            ? "Add User As Admin"
            : "Edit Authorization"}
        </ButtonText>
      </CustomButton>
      {type === renderType.EDIT && (
        <CancelButton onPress={onSuccessfulEdit}>
          <CancelText> Cancel Edit </CancelText>
        </CancelButton>
      )}
    </Card>
  );
};

export default ManageAdminCard;

const width = Dimensions.get("screen").width;

const Card = styled.View`
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  border-width: 1px;
  border-color: black;
  align-self: center;
  align-items: flex-start;
  width: ${width - 60}px;
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

const Username = styled.Text`
  font-size: 18px;
  font-weight: 400;
`;

const BulletContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  justify-content: flex-start;
  margin: 5px;
`;

const BulletText = styled.Text`
  font-size: 16px;
`;

const CustomButton = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  padding: 15px;
  background-color: navy;
  margin: 10px;
`;

const CancelButton = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  padding: 11px;
  background-color: white;
  margin: 10px;
  border-width: 4px;
  border-color: navy;
`;

const CancelText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 15px;
  font-weight: bold;
  color: navy;
`;

const ButtonText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 15px;
  font-weight: bold;
  color: white;
`;
