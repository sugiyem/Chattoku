import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ChatModal from "../../../src/components/Chat/ChatModal";

jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");

const mockData = {
  id: "yem123",
  username: "Sugiyem",
  bio: "Hi, I'm sugiyem.",
  img: "sugiyem-img"
};

describe("Test Chat Modal UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <ChatModal item={mockData} isVisible={true} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "username" }).props.children).toEqual(
      "Sugiyem"
    );
    expect(instance.findByProps({ testID: "bio" }).props.children).toEqual(
      "Hi, I'm sugiyem."
    );
    expect(instance.findByProps({ testID: "image" }).props.source).toEqual({
      uri: "sugiyem-img"
    });
  });

  it("Close and Message icons are pressable", () => {
    const mockCloseModal = jest.fn();
    const mockOpenMessage = jest.fn();

    const { getByTestId } = render(
      <ChatModal
        item={mockData}
        isVisible={true}
        onCloseButtonPress={mockCloseModal}
        onMessageButtonPress={mockOpenMessage}
      />
    );

    fireEvent.press(getByTestId("closeIcon"));
    fireEvent.press(getByTestId("messageIcon"));

    expect(mockCloseModal).toHaveBeenCalled();
    expect(mockOpenMessage).toHaveBeenCalled();
  });
});
