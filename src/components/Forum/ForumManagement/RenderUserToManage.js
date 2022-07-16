import BannedUser from "./BannedUser";
import ForumAdminCard from "./ForumAdminCard";
import styled from "styled-components/native";
import ManageAdminCard from "./ManageAdminCard";
import { useNavigation } from "@react-navigation/native";
import OwnerCard from "./OwnerCard";
import { manageType, renderType } from "../../../constants/Forum";
import { isUserBanned } from "../../../services/Forum/HandleBannedUsers";
import { isUserAdmin } from "../../../services/Forum/HandleForumAdmin";
import { useState, useEffect } from "react";
import RenderUserToBan from "./RenderUserToBan";

const initialData = {
  isBanned: false,
  reason: "",
  isAdmin: false,
  authorities: []
};

const RenderUserToManage = ({ userData, managementType, isAuthorized }) => {
  const [data, setData] = useState(initialData);
  const navigation = useNavigation();
  const forumData = navigation.getState().routes[1].params.data;
  const forumId = forumData.id;

  useEffect(() => {
    if (!userData) {
      return;
    }

    return isUserBanned(forumId, userData.id, (result) => {
      setData((data) => {
        return {
          ...data,
          isBanned: result.isFound,
          reason: result.isFound ? result.reason : ""
        };
      });
    });
  }, [userData]);

  useEffect(() => {
    if (!userData) {
      return;
    }

    isUserAdmin(forumId, userData.id, (result) => {
      setData((data) => {
        return {
          ...data,
          isAdmin: result.isFound,
          authorities: result.isFound ? result.authorities : []
        };
      });
    });
  }, [userData]);

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
        <BannedUser
          userId={userData.id}
          {...data}
          isAuthorized={isAuthorized}
        />
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
  } else if (managementType === manageType.ADMIN) {
    return <ManageAdminCard userData={userData} type={renderType.CREATE} />;
  } else {
    return <RenderUserToBan {...userData} />;
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
