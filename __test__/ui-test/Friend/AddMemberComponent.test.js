import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import AddMemberComponent from "../../../src/components/Friend/AddMemberComponent";

const mockUserData = {
  id: "yem456",
  username: "Yemima",
  bio: "CS Noob",
  img: "yemima-img",
  groupRole: "invalid-role"
};
const mockCancel = jest.fn();
const mockInvite = jest.fn();

describe("Test Add Member Tab UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<AddMemberComponent item={mockUserData} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Yemima"
    );
    expect(instance.findByProps({ testID: "bio" }).props.children).toEqual(
      "CS Noob"
    );
    expect(instance.findByProps({ testID: "role" }).props.children).toEqual(
      "invalid-role"
    );
  });

  it("Invite button works correctly", () => {
    const { getByTestId, queryByTestId } = render(
      <AddMemberComponent
        item={{ ...mockUserData, groupRole: "Not a Member" }}
        onInvite={mockInvite}
        onCancel={mockCancel}
      />
    );

    // No cancel icon
    expect(queryByTestId("cancelIcon")).toBeNull();

    fireEvent.press(getByTestId("inviteIcon"));
    expect(mockInvite).toHaveBeenCalled();
  });

  it("Cancel button works correctly", () => {
    const { getByTestId, queryByTestId } = render(
      <AddMemberComponent
        item={{ ...mockUserData, groupRole: "Pending Member" }}
        onInvite={mockInvite}
        onCancel={mockCancel}
      />
    );

    // No invite icon
    expect(queryByTestId("inviteIcon")).toBeNull();

    fireEvent.press(getByTestId("cancelIcon"));
    expect(mockCancel).toHaveBeenCalled();
  });
});
