import BannedUser from "./BannedUser";
import ForumAdminCard from "./ForumAdminCard";
import styled from "styled-components/native";
import AddAdminCard from "./AddAdminCard";
import { useNavigation } from "@react-navigation/native";
import OwnerCard from "./OwnerCard";

const RenderUserToManage = ({ userData, data }) => {
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;

  if (!userData) {
    return <Title> No Such User Found </Title>;
  }

  const isOwner = userData.id === forumData.owner;

  if (isOwner) {
    return <OwnerCard userData={userData} />;
  } else if (data.isBanned) {
    return (
      <>
        <BannedBadge>
          <BannedText> Banned </BannedText>
        </BannedBadge>
        <BannedUser userId={userData.id} {...data} />
      </>
    );
  } else if (data.isAdmin) {
    return (
      <>
        <AdminBadge>
          <AdminText> Admin </AdminText>
        </AdminBadge>
        <ForumAdminCard userId={userData.id} {...data} />
      </>
    );
  } else {
    return <AddAdminCard userData={userData} />;
  }
};

export default RenderUserToManage;

const BannedBadge = styled.View`
  background-color: white;
  border-width: 2px;
  border-radius: 20px;
  border-color: #c10015;
  align-self: center;
  padding: 5px 30px;
`;

const BannedText = styled.Text`
  color: #c10015;
  font-size: 16px;
  font-weight: 700;
`;

const AdminBadge = styled.View`
  background-color: white;
  border-width: 2px;
  border-radius: 20px;
  border-color: #21ba45;
  align-self: center;
  padding: 5px 30px;
  margin: 10px;
`;

const AdminText = styled.Text`
  color: #21ba45;
  font-size: 16px;
  font-weight: 700;
`;

const Title = styled.Text`
  font-size: 24px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: white;
`;
