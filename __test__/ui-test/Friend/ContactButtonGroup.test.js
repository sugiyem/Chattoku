import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ContactButtonGroup from "../../../src/components/Friend/ContactButtonGroup";

const mockFirstButtonPress = jest.fn();
const mockSecondButtonPress = jest.fn();
const mockButtons = [
  {
    title: "Accept Invitation",
    type: "material",
    icon: "check",
    color: "green",
    onPress: mockFirstButtonPress
  },
  {
    title: "Decline Invitation",
    type: "material",
    icon: "close",
    color: "red",
    onPress: mockSecondButtonPress
  }
];

describe("Test Contact Button UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <ContactButtonGroup buttonDetails={mockButtons} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "icon-0" }).props.name).toEqual(
      "check"
    );
    expect(instance.findByProps({ testID: "icon-1" }).props.name).toEqual(
      "close"
    );
    expect(instance.findByProps({ testID: "title-0" }).props.children).toEqual(
      "Accept Invitation"
    );
    expect(instance.findByProps({ testID: "title-1" }).props.children).toEqual(
      "Decline Invitation"
    );
  });

  it("Buttons work as expected", () => {
    const { getByTestId } = render(
      <ContactButtonGroup buttonDetails={mockButtons} />
    );

    fireEvent.press(getByTestId("icon-0"));

    expect(mockFirstButtonPress).toHaveBeenCalled();
    expect(mockSecondButtonPress).not.toHaveBeenCalled();
  });
});
