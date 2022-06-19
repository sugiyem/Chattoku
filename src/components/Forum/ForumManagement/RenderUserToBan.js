import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { addBannedUsers } from "./HandleBannedUsers";
import { firebase } from "../../../firebase/Config";
import { deleteBannedUsers } from "./HandleBannedUsers";

const RenderUserToBan = ({
  username,
  img,
  id,
  reason,
  isBanned,
  setIsBanned
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [banDetail, setBanDetail] = useState("");
  const [banReason, setBanReason] = useState(reason);
  const navigation = useNavigation();
  const forumId = navigation.getState().routes[1].params.data.id;
  const currentUID = firebase.auth().currentUser.uid;
  const isYou = currentUID === id;

  let buttonMessage;

  //Set Up Different Button Message
  if (isYou) {
    buttonMessage = "You can't ban yourself";
  } else if (isBanned) {
    buttonMessage = "unban";
  } else if (isExpanded) {
    buttonMessage = "cancel";
  } else {
    buttonMessage = "ban";
  }

  function handleButtonPress() {
    if (isYou) return;

    if (isBanned) {
      //Unban Button
      deleteBannedUsers(forumId, id);
      setIsBanned(false);
      setBanReason("");
    } else if (isExpanded) {
      //Cancel Button
      setIsExpanded(false);
      setBanDetail("");
    } else {
      //Ban Button
      setIsExpanded(true);
    }
  }

  function handleConfirmBanButton() {
    addBannedUsers(forumId, id, banDetail).then(() => {
      setIsBanned(true);
      setIsExpanded(false);
      setBanReason(banDetail);
    });
  }

  return (
    <>
      <Card>
        <ProfilePicture
          source={
            img !== ""
              ? { uri: img }
              : require("../../../assets/default-profile.png")
          }
        />
        <InfoContainer>
          <Username>
            {username} {isBanned && "(BANNED)"}
          </Username>
          <Text> {banReason}</Text>
        </InfoContainer>
      </Card>
      <CustomButton onPress={handleButtonPress}>
        <ButtonText> {buttonMessage}</ButtonText>
      </CustomButton>
      {isExpanded && (
        <>
          <TextInputLabel>Enter Ban Details</TextInputLabel>
          <StyledTextInput
            multiline={true}
            value={banDetail}
            onChangeText={setBanDetail}
          />
          <CustomButton onPress={handleConfirmBanButton}>
            <ButtonText> Confirm </ButtonText>
          </CustomButton>
        </>
      )}
    </>
  );
};

export default RenderUserToBan;

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

const TextInputLabel = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-weight: 600;
  font-size: 18px;
  margin: 5px;
  align-self: center;
  color: white;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  width: 90%;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  padding-bottom: 5px;
  align-self: center;
  text-align-vertical: top;
`;
