import React from "react";
import renderer from "react-test-renderer";
import ActiveChatLists from "../../../src/components/Chat/ActiveChatLists";
import { chatType } from "../../../src/constants/Chat";

describe("Test Chat List UI", () => {
  it("Renders Correctly", () => {
    const mockPrivateChatData = {
      id: "yem456",
      username: "Yemima",
      bio: "CS newbie",
      img: "yemima-img",
      lastMessage: "Hello",
      lastMessageTime: null
    };
    const tree = renderer
      .create(
        <ActiveChatLists
          type={chatType.PRIVATE_CHAT}
          item={mockPrivateChatData}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
