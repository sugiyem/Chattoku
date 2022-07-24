import { Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import LikeBar from "./LikeBar";
import styled from "styled-components/native";
import { FetchInfoById } from "../../../services/Profile/FetchUserInfo";
import overlayContext from "../../../screens/Forum/overlayContext";
import ImageSlider from "../../Miscellaneous/ImageSlider";

const initialUserData = {
  img: "",
  username: "fetching username..."
};

const MainPostCard = ({
  title,
  content,
  uid,
  forumId,
  postId,
  img,
  timestamp,
  lastEdited,
  isEditing
}) => {
  const [userData, setUserData] = useState(initialUserData);
  const setOverlayData = useContext(overlayContext);

  useEffect(() => {
    FetchInfoById(uid, (data) => {
      if (data.isDeleted) {
        setUserData({
          ...initialUserData,
          username: "[Deleted Account]",
          isDeleted: true
        });
        return;
      }

      setUserData(data);
    });
  }, []);

  return (
    <HeaderContainer>
      <UserInfo onPress={() => setOverlayData(userData)} testID="userInfo">
        <Profile
          source={
            userData.img !== ""
              ? { uri: userData.img }
              : require("../../../assets/default-profile.png")
          }
        />
        <Text> {userData.username}</Text>
        <DateText> {timestamp} </DateText>
      </UserInfo>
      <Divider />
      <Title>{title}</Title>
      <Content testID="content"> {content} </Content>
      {img.length > 0 && <ImageSlider img={img} />}
      {!!lastEdited && <EditedText> (Last Edited: {lastEdited})</EditedText>}
      {!isEditing && <LikeBar forumId={forumId} postId={postId} />}
    </HeaderContainer>
  );
};

export default MainPostCard;

const Profile = styled.Image`
  align-self: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: white;
`;

const HeaderContainer = styled.View`
  background-color: white;
  margin: 10px;
  padding: 10px;
  border-width: 1px;
  border-color: black;
  border-radius: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
  align-self: center;
`;

const DateText = styled.Text`
  font-size: 13px;
  margin-left: auto;
`;

const EditedText = styled.Text`
  font-size: 13px;
  padding: 5px;
`;

const UserInfo = styled.TouchableOpacity`
  font-size: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Divider = styled.View`
  height: 0.6px;
  background-color: black;
  margin-top: 4px;
`;
const Content = styled.Text`
  padding-top: 5px;
  padding-bottom: 5px;
`;
