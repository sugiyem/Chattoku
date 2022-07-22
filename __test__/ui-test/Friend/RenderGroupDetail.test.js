import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import RenderGroupDetail from "../../../src/components/Friend/RenderGroupDetail";
import { groupMemberType } from "../../../src/constants/Group";

const mockGroupInfo = {
  id: "Group-1",
  name: "Weebs",
  description: "weebs only",
  img: "weeb-img"
};
const mockReplace = jest.fn();
const mockNavigation = {
  replace: mockReplace
};

describe("Test Render Group Detail UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <RenderGroupDetail
        groupInfo={mockGroupInfo}
        type={groupMemberType.MEMBER}
      />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "image" }).props.source).toEqual({
      uri: "weeb-img"
    });
    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Weebs"
    );
    expect(
      instance.findByProps({ testID: "description" }).props.children
    ).toEqual("weebs only");
  });

  it("Go back button works as expected", () => {
    const { getByTestId } = render(
      <RenderGroupDetail
        groupInfo={mockGroupInfo}
        type={groupMemberType.MEMBER}
        navigation={mockNavigation}
      />
    );

    fireEvent.press(getByTestId("backButton"));
    expect(mockReplace).toHaveBeenCalledWith("GroupList");
  });

  it("Admin button is visible if user is admin/owner", () => {
    const { getByTestId } = render(
      <RenderGroupDetail
        groupInfo={mockGroupInfo}
        type={groupMemberType.ADMIN}
      />
    );

    expect(getByTestId("adminButtons")).toBeTruthy();
  });

  it("Admin button is not visible if user is not an admin/owner", () => {
    const { queryByTestId } = render(
      <RenderGroupDetail
        groupInfo={mockGroupInfo}
        type={groupMemberType.MEMBER}
      />
    );

    expect(queryByTestId("adminButtons")).toBeNull();
  });
});
