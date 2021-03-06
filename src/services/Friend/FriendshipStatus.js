import { friendshipType } from "../../constants/Friend";

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
