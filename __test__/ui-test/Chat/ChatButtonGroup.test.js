import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ChatButtonGroup from "../../../src/components/Chat/ChatButtonGroup";

const onMockPress = jest.fn();
const mockButtonDetails = [
  {
    type: "material-community",
    icon: "message-processing-outline",
    color: "blue",
    title: "Open Message",
    onPress: onMockPress
  }
];

describe("Test Chat List Buttons UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <ChatButtonGroup buttonDetails={mockButtonDetails} />
    );
    const instance = tree.root;

    const iconComponentProps = instance.findByProps({ testID: "icon-0" }).props;

    expect(iconComponentProps.type).toEqual("material-community");
    expect(iconComponentProps.name).toEqual("message-processing-outline");
    expect(iconComponentProps.color).toEqual("blue");
    expect(instance.findByProps({ testID: "title-0" }).props.children).toEqual(
      "Open Message"
    );
  });

  it("Button is pressable", () => {
    const { getByTestId } = render(
      <ChatButtonGroup buttonDetails={mockButtonDetails} />
    );

    fireEvent.press(getByTestId("icon-0"));

    expect(onMockPress).toHaveBeenCalled();
  });
});
