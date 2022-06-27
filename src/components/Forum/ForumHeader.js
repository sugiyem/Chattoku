import {
  followForum,
  getForumFollowData,
  unfollowForum,
  updateNotification
} from "../../services/Forum/HandleForum";
import { Alert, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { useEffect, useState } from "react";
import Warning from "../../components/Forum/Warning";
import styled from "styled-components/native";

const ForumHeader = ({ id, img, title, banner, desc, isOwner }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  useEffect(() => {
    getForumFollowData(id, (data) => {
      setIsFollowed(data.isFollowed);
      setIsNotificationOn(data.isNotificationOn);
    });
  }, []);

  function handleButtonClick() {
    isFollowed
      ? Warning(() =>
          unfollowForum(id, () => {
            setIsFollowed(!isFollowed);
            setIsNotificationOn(true);
          })
        )
      : followForum(id, () => setIsFollowed(!isFollowed));
  }

  function handleNotificationClick() {
    const message = !isNotificationOn
      ? "Notification turned on successfully"
      : "Notification turned off successfully";

    updateNotification(id, !isNotificationOn, () => {
      Alert.alert(message);
      setIsNotificationOn(!isNotificationOn);
    });
  }

  const RenderNotificationButton = () => {
    return isNotificationOn ? (
      <NotificationOnWrapper onPress={handleNotificationClick}>
        <Icon type="material" name="notifications-active" color="blue" />
      </NotificationOnWrapper>
    ) : (
      <NotificationOffWrapper onPress={handleNotificationClick}>
        <Icon type="material" name="notifications-off" color="gray" />
      </NotificationOffWrapper>
    );
  };

  const RenderButton = () =>
    isOwner ? (
      <OwnerBadge>
        <ButtonText> Owner </ButtonText>
      </OwnerBadge>
    ) : (
      <>
        {isFollowed && <RenderNotificationButton />}
        <FollowButton onPress={handleButtonClick}>
          <ButtonText> {isFollowed ? "Unfollow" : "Follow"} </ButtonText>
        </FollowButton>
      </>
    );

  return (
    <HeaderContainer>
      <Banner
        source={
          banner !== ""
            ? { uri: banner }
            : require("../../assets/default-banner.png")
        }
      />
      <ForumDetails>
        <TitleContainer>
          <Title>{title}</Title>
          <RenderButton />
        </TitleContainer>
        <Desc> {desc} </Desc>
        <Logo
          source={
            img !== ""
              ? { uri: img }
              : require("../../assets/default-profile.png")
          }
        />
      </ForumDetails>
    </HeaderContainer>
  );
};

export default ForumHeader;

const width = Dimensions.get("screen").width;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${width - 18}px;
  background-color: cyan;
  border-radius: 10px;
  border-color: blue;
  border-width: 1px;
  margin: 5px;
`;

const Banner = styled.Image`
  width: ${width - 20}px;
  height: ${(width * 2) / 5 - 8}px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
`;

const ForumDetails = styled.View`
  width: 100%;
  padding: 10px;
`;

const Logo = styled.Image`
  position: absolute;
  height: 80px;
  width: 80px;
  border-radius: 80px;
  border-width: 1px;
  border-color: white;
  top: -70px;
  left: 20px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-right: auto;
`;

const Desc = styled.Text`
  font-size: 14px;
`;

const NotificationOnWrapper = styled.TouchableOpacity`
  margin-left: auto;
  margin-right: 5px;
  padding: 5px;
  background: #82eefd;
  border-radius: 20px;
  border-width: 1px;
  border-color: blue;
`;

const NotificationOffWrapper = styled.TouchableOpacity`
  margin-left: auto;
  margin-right: 5px;
  padding: 5px;
  background: lightgray;
  border-radius: 20px;
  border-width: 1px;
  border-color: gray;
`;

const FollowButton = styled.TouchableOpacity`
  align-self: stretch;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
  border-radius: 20px;
  border-width: 1px;
  background-color: white;
  justify-self: flex-end;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: blue;
`;

const OwnerBadge = styled.View`
  align-self: stretch;
  padding: 5px;
  padding-left: 30px;
  padding-right: 30px;
  margin: 5px;
  margin-left: auto;
  border-radius: 20px;
  border-width: 1px;
  background-color: white;
`;
