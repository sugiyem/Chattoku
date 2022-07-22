import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import GroupAdminButtons from "../../../src/components/Friend/GroupAdminButtons";
import { groupMemberType } from "../../../src/constants/Group";

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate
};
const mockGroupInfo = {
  id: "Group-1",
  name: "Weebs",
  description: "weebs only",
  img: "weeb-img"
};

describe("Test Group Admin Buttons UI", () => {
  it("All buttons work as expected", () => {
    const { getByTestId } = render(
      <GroupAdminButtons
        groupInfo={mockGroupInfo}
        navigation={mockNavigation}
      />
    );

    fireEvent.press(getByTestId("editGroup"));
    fireEvent.press(getByTestId("addMember"));
    fireEvent.press(getByTestId("manageMember"));
    fireEvent.press(getByTestId("manageInvite"));

    expect(mockNavigate).toHaveBeenNthCalledWith(1, "EditGroup", {
      groupInfo: mockGroupInfo
    });
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "AddGroupMember", {
      groupInfo: mockGroupInfo
    });
    expect(mockNavigate).toHaveBeenNthCalledWith(3, "EditGroupMember", {
      groupInfo: mockGroupInfo
    });
    expect(mockNavigate).toHaveBeenNthCalledWith(4, "EditPendingGroupMember", {
      groupInfo: mockGroupInfo
    });
  });

  it("Delete group is available for owner", () => {
    const { getByTestId } = render(
      <GroupAdminButtons type={groupMemberType.OWNER} />
    );

    expect(getByTestId("deleteGroup")).toBeTruthy();
  });

  it("Delete group is not available for admin", () => {
    const { queryByTestId } = render(
      <GroupAdminButtons type={groupMemberType.ADMIN} />
    );

    expect(queryByTestId("deleteGroup")).toBeNull();
  });
});
