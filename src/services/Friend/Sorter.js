export const groupMemberSorter = (x, y) => {
  const groupRoles = ["Owner", "Admin", "Member"];

  if (x.groupRole === y.groupRole) {
    return x.username - y.username;
  }

  return groupRoles.indexOf(x.groupRole) - groupRoles.indexOf(y.groupRole);
};
