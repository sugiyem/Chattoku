import React, { useEffect, useMemo, useState } from "react";
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
import { Icon } from "react-native-elements";
import { friendshipType } from "../../constants/Friend";
import Caution from "../Miscellaneous/Caution";
import { IconContainer, IconDescription } from "../../styles/ChatStyles";

const EditFriendIcon = ({ userId, isSmall = false }) => {
  const [friends, setFriends] = useState([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);
  const iconSize = isSmall ? 25 : 40;
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
    Caution("This user will be removed from your friend's list", () =>
      removeFriend(userId)
    );
  }

  function handleDeny() {
    Caution("This friend request will be declined", () =>
      declineFriendRequest(userId).then(() =>
        Alert.alert("Declined Successfully")
      )
    );
  }

  if (status === friendshipType.FRIEND) {
    return (
      <IconContainer isSmall={isSmall}>
        <Icon
          name="person-remove"
          type="material"
          size={iconSize}
          color="#c10015"
          onPress={handleRemove}
        />
        <IconDescription color="#c10014" isSmall={isSmall}>
          Unfriend
        </IconDescription>
      </IconContainer>
    );
  } else if (status === friendshipType.RECEIVING_REQUEST) {
    return (
      <>
        <IconContainer isSmall={isSmall}>
          <Icon
            name="account-check"
            type="material-community"
            size={iconSize}
            color="navy"
            onPress={() => acceptFriendRequest(userId)}
          />
          <IconDescription color="navy" isSmall={isSmall}>
            Accept
          </IconDescription>
        </IconContainer>

        <IconContainer isSmall={isSmall}>
          <Icon
            name="account-remove"
            type="material-community"
            size={iconSize}
            color="#c10015"
            onPress={handleDeny}
          />
          <IconDescription color="#c10015" isSmall={isSmall}>
            Decline
          </IconDescription>
        </IconContainer>
      </>
    );
  } else if (status === friendshipType.WAITING_RESPONSE) {
    return (
      <IconContainer isSmall={isSmall}>
        <Icon
          name="account-remove"
          type="material-community"
          size={iconSize}
          color="#c10015"
          onPress={() => cancelFriendRequest(userId)}
        />
        <IconDescription color="#c10014" isSmall={isSmall}>
          Cancel
        </IconDescription>
      </IconContainer>
    );
  } else {
    return (
      <IconContainer isSmall={isSmall}>
        <Icon
          name="person-add"
          type="material"
          size={iconSize}
          color={"navy"}
          onPress={() => addFriend(userId)}
        />
        <IconDescription color="navy" isSmall={isSmall}>
          Add
        </IconDescription>
      </IconContainer>
    );
  }
};

export default EditFriendIcon;
