import React from "react";
import styled from "styled-components/native";
import { Icon, ListItem } from "react-native-elements";
import ContactImage from "./ContactImage";
import { itemContainerStyle } from "../../styles/ListStyles";

const AddMemberComponent = ({ item, onInvite, onCancel }) => {
  const isPendingMember = item.groupRole === "Pending Member";
  const isNonMember = item.groupRole === "Not a Member";

  const EditButton = () => (
    <ContentContainer>
      {isPendingMember ? (
        <Icon
          type="material-community"
          name="account-remove"
          color="#ED2939"
          size={30}
          onPress={onCancel}
          testID="cancelIcon"
        />
      ) : isNonMember ? (
        <Icon
          type="material-community"
          name="account-plus"
          color="#228B22"
          size={30}
          onPress={onInvite}
          testID="inviteIcon"
        />
      ) : null}
    </ContentContainer>
  );

  return (
    <ListItem containerStyle={itemContainerStyle} bottomDivider>
      <ItemContainer>
        <ContentContainer>
          <ContactImage item={item} />
        </ContentContainer>
        <ContentContainer size="2">
          <ListItem.Content>
            <ListItem.Title testID="name">{item.username}</ListItem.Title>
            <ListItem.Subtitle testID="bio">{item.bio}</ListItem.Subtitle>
            <ListItem.Subtitle testID="role">
              {item.groupRole}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ContentContainer>
        <EditButton />
      </ItemContainer>
    </ListItem>
  );
};

export default AddMemberComponent;

const ItemContainer = styled.View`
  flex-direction: row;
  margin-horizontal: 5px;
  align-items: center;
`;

const ContentContainer = styled.View`
  flex-direction: column;
  flex: ${(props) => (props.size ? props.size : "1")};
`;
