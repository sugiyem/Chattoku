export const groupListType = {
  GROUP: 0,
  GROUP_INVITATION: 1
};

export const groupMemberType = {
  OWNER: 0,
  ADMIN: 1,
  MEMBER: 2,
  PENDING_MEMBER: 3,
  NON_MEMBER: 4
};

export const groupMemberSorter = (x, y) => {
  const groupRoles = ["Owner", "Admin", "Member"];

  if (x.groupRole === y.groupRole) {
    return x.username - y.username;
  }

  return groupRoles.indexOf(x.groupRole) - groupRoles.indexOf(y.groupRole);
};
