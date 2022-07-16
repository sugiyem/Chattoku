// return user's advanced group role
// (owner, admin, member, pending member, or non-member)
export function getAdvancedGroupRole(
  userID,
  groupOwnerID,
  groupAdmins,
  groupMembers,
  groupPendingMembers
) {
  if (groupAdmins.includes(userID)) {
    if (userID === groupOwnerID) {
      return "Owner";
    } else {
      return "Admin";
    }
  } else if (groupMembers.includes(userID)) {
    return "Member";
  } else if (groupPendingMembers.includes(userID)) {
    return "Pending Member";
  } else {
    return "Not a Member";
  }
}

// return user's simplified group role (member, pending member, or non-member)
export function getSimplifiedGroupRole(
  userID,
  groupMembers,
  groupPendingMembers
) {
  return getAdvancedGroupRole(
    userID,
    "",
    [],
    groupMembers,
    groupPendingMembers
  );
}
