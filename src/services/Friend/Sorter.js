export const groupMemberSorter = (x, y) => {
  const groupRoles = [
    "Owner",
    "Admin",
    "Member",
    "Pending Member",
    "Not a Member"
  ];

  if (x.groupRole === y.groupRole) {
    return x.username - y.username;
  }

  return groupRoles.indexOf(x.groupRole) - groupRoles.indexOf(y.groupRole);
};

export const reversedGroupMemberSorter = (x, y) => {
  const groupRoles = [
    "Not a Member",
    "Pending Member",
    "Member",
    "Admin",
    "Owner"
  ];

  if (x.groupRole === y.groupRole) {
    return x.username - y.username;
  }

  return groupRoles.indexOf(x.groupRole) - groupRoles.indexOf(y.groupRole);
};
