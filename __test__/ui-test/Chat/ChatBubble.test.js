import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import ChatBubble from "../../../src/components/Chat/ChatBubble";

jest.mock("react-native-gifted-chat");

const mockShownProps = {
  username: "Yemima",
  user: { _id: "yem123" },
  previousMessage: { user: { _id: "yem123" }, createdAt: new Date(2022, 5, 8) },
  currentMessage: { user: { _id: "yem456" }, createdAt: new Date(2022, 6, 5) }
};

const mockNotShownProps = {
  username: "Yemima",
  user: { _id: "yem123" },
  previousMessage: { user: { _id: "yem456" }, createdAt: new Date(2022, 6, 5) },
  currentMessage: { user: { _id: "yem456" }, createdAt: new Date(2022, 6, 5) }
};

describe("Test Chat Bubble UI", () => {
  it("Username must be shown", () => {
    const tree = renderer.create(<ChatBubble {...mockShownProps} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "username" }).props.children).toEqual(
      "Yemima"
    );
  });

  it("Username must not be shown", () => {
    const { queryByTestId } = render(<ChatBubble {...mockNotShownProps} />);

    expect(queryByTestId("username")).toBeNull();
  });
});
