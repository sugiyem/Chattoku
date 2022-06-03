export const friendshipType = {
  FRIEND: 0,
  WAITING_RESPONSE: 1,
  RECEIVING_REQUEST: 2,
  NON_FRIEND: 3
};

export function getFriendshipStatus(
  userID,
  friends,
  friendRequestsSent,
  friendRequestsReceived
) {
  if (friends.includes(userID)) {
    return friendshipType.FRIEND;
  } else if (friendRequestsSent.includes(userID)) {
    return friendshipType.WAITING_RESPONSE;
  } else if (friendRequestsReceived.includes(userID)) {
    return friendshipType.RECEIVING_REQUEST;
  } else {
    return friendshipType.NON_FRIEND;
  }
}
