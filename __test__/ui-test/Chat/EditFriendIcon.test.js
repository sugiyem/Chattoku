import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import EditFriendIcon from "../../../src/components/Chat/EditFriendIcon";
import {
  addFriend,
  acceptFriendRequest,
  cancelFriendRequest,
  removeFriend,
  declineFriendRequest
} from "../../../src/services/Friend/HandleFriend";
import { friendshipType } from "../../../src/constants/Friend";

jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");
jest.mock("../../../src/services/Friend/HandleFriend");

describe("Test Edit Friend Icon UI", () => {
  it("Renders correctly when other user is friend", () => {
    const tree = renderer.create(
      <EditFriendIcon defaultStatus={friendshipType.FRIEND} />
    );
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "unfriendDescription" }).props.children
    ).toEqual("Unfriend");
    expect(instance.findByProps({ testID: "unfriendIcon" }).props.name).toEqual(
      "person-remove"
    );
  });

  it("Renders correctly when other user sends a request", () => {
    const tree = renderer.create(
      <EditFriendIcon defaultStatus={friendshipType.RECEIVING_REQUEST} />
    );
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "acceptDescription" }).props.children
    ).toEqual("Accept");
    expect(
      instance.findByProps({ testID: "declineDescription" }).props.children
    ).toEqual("Decline");
    expect(instance.findByProps({ testID: "acceptIcon" }).props.name).toEqual(
      "account-check"
    );
    expect(instance.findByProps({ testID: "declineIcon" }).props.name).toEqual(
      "account-remove"
    );
  });

  it("Renders correctly when other user receives a request", () => {
    const tree = renderer.create(
      <EditFriendIcon defaultStatus={friendshipType.WAITING_RESPONSE} />
    );
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "cancelDescription" }).props.children
    ).toEqual("Cancel");
    expect(instance.findByProps({ testID: "cancelIcon" }).props.name).toEqual(
      "account-remove"
    );
  });

  it("Renders correctly when other user is not a friend", () => {
    const tree = renderer.create(
      <EditFriendIcon defaultStatus={friendshipType.NON_FRIEND} />
    );
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "addDescription" }).props.children
    ).toEqual("Add");
    expect(instance.findByProps({ testID: "addIcon" }).props.name).toEqual(
      "person-add"
    );
  });

  it("Unfriend Icon is pressable", () => {
    const { getByTestId } = render(
      <EditFriendIcon userId="yem456" defaultStatus={friendshipType.FRIEND} />
    );

    fireEvent.press(getByTestId("unfriendIcon"));

    expect(removeFriend).toHaveBeenCalledWith("yem456");
  });

  it("Accept and Decline Icon are pressable", () => {
    const { getByTestId } = render(
      <EditFriendIcon
        userId="yem456"
        defaultStatus={friendshipType.RECEIVING_REQUEST}
      />
    );

    fireEvent.press(getByTestId("acceptIcon"));
    fireEvent.press(getByTestId("declineIcon"));

    expect(acceptFriendRequest).toHaveBeenCalledWith("yem456");
    expect(declineFriendRequest).toHaveBeenCalledWith("yem456");
  });

  it("Cancel Icon is pressable", () => {
    const { getByTestId } = render(
      <EditFriendIcon
        userId="yem456"
        defaultStatus={friendshipType.WAITING_RESPONSE}
      />
    );

    fireEvent.press(getByTestId("cancelIcon"));

    expect(cancelFriendRequest).toHaveBeenCalledWith("yem456");
  });

  it("Add Icon is pressable", () => {
    const { getByTestId } = render(
      <EditFriendIcon
        userId="yem456"
        defaultStatus={friendshipType.NON_FRIEND}
      />
    );

    fireEvent.press(getByTestId("addIcon"));

    expect(addFriend).toHaveBeenCalledWith("yem456");
  });
});
