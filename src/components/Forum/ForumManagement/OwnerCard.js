import styled from "styled-components/native";

const OwnerCard = ({ userData }) => {
  return (
    <>
      <OwnerBadge>
        <OwnerText> Owner </OwnerText>
      </OwnerBadge>
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
        </InfoContainer>
      </Card>
    </>
  );
};

export default OwnerCard;

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

const OwnerBadge = styled.View`
  background-color: white;
  border-width: 2px;
  border-radius: 20px;
  border-color: #eebc1d;
  align-self: center;
  padding: 5px 30px;
`;

const OwnerText = styled.Text`
  color: #eebc1d;
  font-size: 16px;
  font-weight: 700;
`;
