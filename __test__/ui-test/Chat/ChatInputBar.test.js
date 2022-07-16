import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import ChatInputBar from "../../../src/components/Chat/ChatInputBar";

jest.mock("react-native-gifted-chat");

describe("Test Chat Input Bar UI", () => {
  it("Renders correctly when user is blocked", () => {
    const tree = renderer.create(<ChatInputBar isBlocked={true} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "blockedWarning" }).props.children
    ).toEqual("You've been blocked by this user");
  });

  it("Renders correctly when user is the blocker", () => {
    const tree = renderer.create(<ChatInputBar isBlocking={true} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "blockingWarning" }).props.children
    ).toEqual("You've blocked this user.");
  });

  it("Renders correctly when user can send message", () => {
    const { queryByTestId } = render(<ChatInputBar />);

    expect(queryByTestId("blockedWarning")).toBeNull();
    expect(queryByTestId("blockingWarning")).toBeNull();
  });
});
