import { useMemo, useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import {
  fetchFriend,
  fetchFriendRequestsReceived,
  fetchFriendRequestsSent
} from "../../services/Friend/FetchFriendStatus";
import {
  addFriend,
  acceptFriendRequest,
  cancelFriendRequest,
  removeFriend,
  declineFriendRequest
} from "../../services/Friend/HandleFriend";
import { getFriendshipStatus } from "../../services/Friend/FriendshipStatus";
import styled from "styled-components/native";
import { friendshipType } from "../../constants/Friend";
import Warning from "./Warning";
import { Alert } from "react-native";

const RenderFriendSection = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);
  const status = useMemo(
    () =>
      getFriendshipStatus(
        userId,
        friends,
        friendRequestsSent,
        friendRequestsReceived
      ),
    [friends, friendRequestsReceived, friendRequestsSent]
  );

  useEffect(() => {
    return fetchFriend({
      onSuccess: (data) => {
        setFriends(data.map((item) => item.id));
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchFriendRequestsSent({
      onSuccess: (data) => {
        setFriendRequestsSent(data.map((item) => item.id));
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchFriendRequestsReceived({
      onSuccess: (data) => {
        setFriendRequestsReceived(data.map((item) => item.id));
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  function handleRemove() {
    Warning(() =>
      removeFriend(userId).then(() => Alert.alert("Removed Successfully"))
    );
  }

  function handleDeny() {
    Warning(() =>
      declineFriendRequest(userId).then(() =>
        Alert.alert("Declined Successfully")
      )
    );
  }

  if (status === friendshipType.FRIEND) {
    return (
      <Section onPress={handleRemove}>
        <Icon name="person-remove" type="material" size={40} color="#c10015" />
        <NegativeText> Remove Friend</NegativeText>
      </Section>
    );
  } else if (status === friendshipType.RECEIVING_REQUEST) {
    return (
      <>
        <Section onPress={() => acceptFriendRequest(userId)}>
          <Icon name="check" type="material" size={40} color="navy" />
          <PositiveText> Accept Friend Request</PositiveText>
        </Section>
        <Divider />
        <Section onPress={handleDeny}>
          <Icon name="close" type="material" size={40} color="#c10015" />
          <NegativeText> Deny Friend Request </NegativeText>
        </Section>
      </>
    );
  } else if (status === friendshipType.WAITING_RESPONSE) {
    return (
      <Section onPress={() => cancelFriendRequest(userId)}>
        <Icon name="close" type="material" size={40} color="#c10015" />
        <NegativeText> Cancel Friend Request</NegativeText>
      </Section>
    );
  } else {
    return (
      <Section onPress={() => addFriend(userId)}>
        <Icon name="person-add" type="material" size={40} color={"navy"} />
        <PositiveText> Add Friend </PositiveText>
      </Section>
    );
  }
};

export default RenderFriendSection;

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
