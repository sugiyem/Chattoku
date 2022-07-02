import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert, Dimensions, Text } from "react-native";
import { AdminPower } from "../../../constants/Admin";
import Selector from "../../Miscellaneous/Selector";
import { addAdmin } from "../../../services/Forum/HandleForumAdmin";
import { useNavigation } from "@react-navigation/native";

const AddAdminCard = ({ userData }) => {
  const [selected, setSelected] = useState([]);
  const navigation = useNavigation();
  const forumId = navigation.getState().routes[1].params.data.id;

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
    addAdmin(forumId, { uid: userData.id, authorities: selected }, () => {
      Alert.alert("Authorization Success");
    });
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
        <ButtonText> Add User As Admin </ButtonText>
      </CustomButton>
    </Card>
  );
};

export default AddAdminCard;

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
  margin: 20px;
`;

const ButtonText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 15px;
  font-weight: bold;
  color: white;
`;
