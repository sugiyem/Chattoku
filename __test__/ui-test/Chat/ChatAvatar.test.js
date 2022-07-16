import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ChatAvatar from "../../../src/components/Chat/ChatAvatar";

const mockSetState = jest.fn();

jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Chat Avatar UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <ChatAvatar userInfo={{ img: "avatar-img" }} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "avatar" }).props.source.uri).toEqual(
      "avatar-img"
    );
  });

  it("The avatar is pressable", () => {
    const { getByTestId } = render(
      <ChatAvatar userInfo={{ img: "avatar-img" }} />
    );

    fireEvent.press(getByTestId("avatar"));

    expect(mockSetState).toHaveBeenCalledWith(true);
  });
});
