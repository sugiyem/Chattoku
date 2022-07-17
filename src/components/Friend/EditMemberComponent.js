import { Icon, ListItem } from "react-native-elements";
import {
  cancelGroupInvitation,
  removeUserFromGroup
} from "../../services/Friend/HandleGroup";
import {
  demoteAdminToMember,
  promoteMemberToAdmin
} from "../../services/Friend/HandleGroupAdmin";
import { getCurrentUID } from "../../services/Profile/FetchUserInfo";
import { contactType } from "../../constants/Contact";
import ContactBar from "./ContactBar";
import Caution from "../Miscellaneous/Caution";
import { itemContainerStyle } from "../../styles/ListStyles";
import { View } from "react-native";
import { IconText } from "../../styles/GeneralStyles";
import styled from "styled-components/native";

const EditMemberComponent = ({ item, isMember, groupInfo }) => {
  const currentID = getCurrentUID();
  const groupID = groupInfo.id;
  const itemID = item.id;

  const isOtherUserOwner = item.groupRole === "Owner";
  const isOtherUserAdmin = item.groupRole === "Admin";

  const alertTitle = isMember
    ? "This user will be removed from the group"
    : "This invitation will be removed";

  const isCurrentUserOwner = currentID === groupInfo.owner;
  const isEditable =
    !isMember ||
    (!isOtherUserOwner && (isCurrentUserOwner || !isOtherUserAdmin));

  const buttonDetails = [
    {
      title: "Remove",
      type: "material-community",
      icon: "account-remove",
      color: "#ED2939",
      onPress: onRemovePress
    }
  ];

  if (isCurrentUserOwner && isMember) {
    buttonDetails.push({
      title: isOtherUserAdmin ? "Demote" : "Promote",
      type: "material-community",
      icon: isOtherUserAdmin ? "account-arrow-down" : "account-arrow-up",
      color: isOtherUserAdmin ? "#317873" : "navy",
      onPress: onAdminUpdatePress
    });
  }

  function onRemovePress() {
    const handleRemove = () => {
      isMember
        ? removeUserFromGroup(groupID, itemID)
        : cancelGroupInvitation(groupID, itemID);
    };

    return Caution(alertTitle, handleRemove);
  }

  async function onAdminUpdatePress() {
    if (isOtherUserAdmin) {
      await demoteAdminToMember(groupID, itemID);
    } else {
      await promoteMemberToAdmin(groupID, itemID);
    }
  }

  const RenderButtons = () =>
    buttonDetails.map((detail, index) => (
      <View key={index}>
        <Icon
          type={detail.type}
          name={detail.icon}
          size={30}
          color={detail.color}
          onPress={detail.onPress}
        />
        <IconText>{detail.title}</IconText>
      </View>
    ));

  return (
    <ListItem bottomDivider containerStyle={itemContainerStyle}>
      <ItemContainer>
        <InfoContainer>
          <ContactBar type={contactType.USER} item={item} />
        </InfoContainer>
        <ButtonContainer>{isEditable && <RenderButtons />}</ButtonContainer>
      </ItemContainer>
    </ListItem>
  );
};

export default EditMemberComponent;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InfoContainer = styled.View`
  flex: 2;
  flex-direction: row;
`;

const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
