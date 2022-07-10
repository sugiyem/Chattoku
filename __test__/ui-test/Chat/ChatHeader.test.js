import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ChatHeader from "../../../src/components/Chat/ChatHeader";
import { chatType } from "../../../src/constants/Chat";

jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");
jest.mock("../../../src/services/Friend/HandleGroup");

const mockPrivateChatData = {
  id: "yem456",
  username: "Yemima",
  bio: "CS newbie",
  img: "yemima-img"
};

const mockGroupChatData = {
  id: "group-1",
  name: "Weebs",
  description: "For weeb only",
  img: "w-img"
};

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn()
};

describe("Test Chat Header UI", () => {
  it("Renders correctly when it is a private chat", () => {
    const tree = renderer.create(
      <ChatHeader
        type={chatType.PRIVATE_CHAT}
        item={mockPrivateChatData}
        navigation={mockNavigation}
      />
    );
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "profileImage" }).props.source.uri
    ).toEqual("yemima-img");
    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Yemima"
    );
    expect(instance.findByProps({ testID: "info" }).props.children).toEqual(
      "CS newbie"
    );
  });

  it("Renders correctly when it is a group chat", () => {
    const tree = renderer.create(
      <ChatHeader
        type={chatType.GROUP_CHAT}
        item={mockGroupChatData}
        navigation={mockNavigation}
      />
    );
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "profileImage" }).props.source.uri
    ).toEqual("w-img");
    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Weebs"
    );
    expect(instance.findByProps({ testID: "info" }).props.children).toEqual(
      "For weeb only"
    );
  });

  it("Icons are pressable", () => {
    const { getByTestId } = render(
      <ChatHeader
        type={chatType.GROUP_CHAT}
        item={mockGroupChatData}
        navigation={mockNavigation}
      />
    );

    fireEvent.press(getByTestId("backIcon"));
    fireEvent.press(getByTestId("groupPageIcon"));

    expect(mockNavigation.goBack).toHaveBeenCalled();
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Friends", {
      screen: "GroupInfo",
      initial: false,
      params: { groupData: mockGroupChatData }
    });
  });
});
