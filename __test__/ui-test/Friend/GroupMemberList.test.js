import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import GroupMemberList from "../../../src/components/Friend/GroupMemberList";

const mockSetState = jest.fn();
const mockGroupMembers = [
  {
    username: "Sugiyem",
    bio: "CS Noob",
    img: "sugiyem-img"
  }
];

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Group Member List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <GroupMemberList title="Chattoku" items={mockGroupMembers} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Chattoku"
    );
  });

  it("Accordion works as expected when default is false", () => {
    const { getByTestId } = render(
      <GroupMemberList title="Chattoku" items={mockGroupMembers} />
    );

    fireEvent.press(getByTestId("accordion"));

    expect(mockSetState).toHaveBeenCalledWith(true);
  });
});
