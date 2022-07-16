import React from "react";
import renderer from "react-test-renderer";
import ChatBar from "../../../src/components/Chat/ChatBar";

const mockPrivateChatItem = {
  username: "Sugiyem",
  lastMessage: "Sugiyem: Hello guys",
  lastMessageTime: new Date(2022, 5, 8),
  img: ""
};

const mockGroupChatItem = {
  name: "Weebs",
  lastMessage: "Sugiyem has sent an image",
  lastMessageTime: new Date(2022, 5, 8),
  img: ""
};

describe("Test Active Chat Bar UI", () => {
  it("Renders correctly for private chat", () => {
    const tree = renderer.create(
      <ChatBar item={mockPrivateChatItem} isPrivateChat={true} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Sugiyem"
    );
    expect(
      instance.findByProps({ testID: "lastMessage" }).props.children
    ).toEqual("Sugiyem: Hello guys");
  });

  it("Renders correctly for group chat", () => {
    const tree = renderer.create(
      <ChatBar item={mockGroupChatItem} isPrivateChat={false} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Weebs"
    );
    expect(
      instance.findByProps({ testID: "lastMessage" }).props.children
    ).toEqual("Sugiyem has sent an image");
  });
});
