import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import BlockIcon from "../../../src/components/Chat/BlockIcon";
import {
  blockUser,
  unblockUser
} from "../../../src/services/Friend/HandleBlockedUser";

jest.mock("../../../src/services/Friend/HandleBlockedUser");

describe("Test Block Icon UI", () => {
  it("Renders correctly when other user is unblocked", () => {
    const tree = renderer.create(<BlockIcon defaultState={false} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "blockDescription" }).props.children
    ).toEqual("Block");
    expect(instance.findByProps({ testID: "blockIcon" }).props.name).toEqual(
      "block"
    );
  });

  it("Renders correctly when other user is blocked", () => {
    const tree = renderer.create(<BlockIcon defaultState={true} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "unblockDescription" }).props.children
    ).toEqual("Unblock");
    expect(instance.findByProps({ testID: "unblockIcon" }).props.name).toEqual(
      "account-lock-open-outline"
    );
  });

  it("Block Icon is pressable", () => {
    const { getByTestId } = render(
      <BlockIcon userId="yem456" defaultState={false} />
    );

    fireEvent.press(getByTestId("blockIcon"));

    expect(blockUser).toHaveBeenCalledWith("yem456");
  });

  it("Unblock icon is pressable", () => {
    const { getByTestId } = render(
      <BlockIcon userId="yem456" defaultState={true} />
    );

    fireEvent.press(getByTestId("unblockIcon"));

    expect(unblockUser).toHaveBeenCalledWith("yem456");
  });
});
