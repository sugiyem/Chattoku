import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import styled from "styled-components/native";
import overlayContext from "../../screens/Forum/overlayContext";
import { getCurrentUID } from "../../services/Profile/FetchUserInfo";
import RenderFriendSection from "./RenderFriendSection";
import {
  blockUser,
  unblockUser,
  isBlockedByCurrentUser
} from "../../services/Friend/HandleBlockedUser";
import Caution from "../Miscellaneous/Caution";

const BlockSection = ({ isBlocked, userId }) => {
  function handleBlock() {
    Caution("This user will be blocked", () => blockUser(userId));
  }

  function handleUnblock() {
    Caution("This user will be unblocked", () => unblockUser(userId));
  }

  if (isBlocked) {
    return (
      <Section onPress={handleUnblock}>
        <Icon
          name="account-lock-open-outline"
          type="material-community"
          size={40}
          color="green"
        />
        <PositiveText>Unblock</PositiveText>
      </Section>
    );
  } else {
    return (
      <Section onPress={handleBlock}>
        <Icon name="block" type="material" size={40} color={"#c10015"} />
        <NegativeText> Block </NegativeText>
      </Section>
    );
  }
};

const ProfileOverlay = ({ userData }) => {
  const navigation = useNavigation();
  const currentUID = getCurrentUID();
  const setOverlayData = useContext(overlayContext);
  const isYou = currentUID === userData.id;
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (isYou || userData.isDeleted) return;

    return isBlockedByCurrentUser(
      userData.id,
      () => setIsBlocked(true),
      () => setIsBlocked(false)
    );
  }, []);

  console.log(userData);

  function handleCloseClick() {
    setOverlayData(null);
  }

  function handleMessageClick() {
    const data = {
      id: userData.id,
      username: userData.username,
      bio: userData.bio,
      img: userData.img
    };

    navigation.navigate("Chat", {
      screen: "ChatDetail",
      initial: false,
      params: {
        userData: data
      }
    });
  }

  return (
    <Container>
      <Card>
        <UserInfo>
          <Profile
            source={
              userData.img !== ""
                ? { uri: userData.img }
                : require("../../assets/default-profile.png")
            }
          />
          <Username> {userData.username}</Username>
          {isYou && <CurrentUserText> (YOU) </CurrentUserText>}
        </UserInfo>
        {!(isYou || userData.isDeleted) && (
          <>
            <Divider />
            <RenderFriendSection userId={userData.id} />
            <Divider />
            <Section onPress={handleMessageClick}>
              <Icon name="message" type="material" size={40} color={"navy"} />
              <PositiveText> Message </PositiveText>
            </Section>
            <Divider />
            <BlockSection userId={userData.id} isBlocked={isBlocked} />
          </>
        )}
        <CloseButton onPress={handleCloseClick}>
          <CloseText> Close </CloseText>
        </CloseButton>
      </Card>
    </Container>
  );
};

export default ProfileOverlay;

const Container = styled.View`
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 100;
  background-color: #00000050;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.TouchableOpacity`
  background-color: #303030;
  margin: 0px;
  width: 320px;
`;

const CloseText = styled.Text`
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 10px;
`;

const Card = styled.View`
  background-color: white;
  width: 300px;
  border-width: 2px;
  border-color: black;
  overflow: hidden;
  align-items: center;
`;

const Profile = styled.Image`
  align-self: center;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  border-width: 2px;
  border-color: black;
`;

const Username = styled.Text`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin: 0px;
  padding: 0px;
`;

const CurrentUserText = styled.Text`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  margin: 0px;
  padding: 0px;
`;

const UserInfo = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
`;

const Section = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 5px;
  align-self: flex-start;
`;

const PositiveText = styled.Text`
  font-size: 20px;
  color: navy;
  margin-left: 10px;
`;

const NegativeText = styled.Text`
  font-size: 20px;
  color: #c10015;
  margin-left: 10px;
`;

const Divider = styled.View`
  width: 100%;
  height: 1.5px;
  background-color: black;
  margin-top: 4px;
`;
