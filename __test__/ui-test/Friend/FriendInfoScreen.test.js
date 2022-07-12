import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import FriendInfoScreen from "../../../src/screens/Friend/FriendInfoScreen";

const mockGoBack = jest.fn();
const mockNavigation = {
  goBack: mockGoBack
};
const mockRoute = {
  params: {
    friendData: {
      id: "yem456",
      username: "Yemima",
      bio: "NUS Student",
      img: "yemima-img"
    }
  }
};

jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Friend Info Page UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <FriendInfoScreen navigation={mockNavigation} route={mockRoute} />
    );
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "profileImage" }).props.source
    ).toEqual({ uri: "yemima-img" });
    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Yemima"
    );
    expect(instance.findByProps({ testID: "info" }).props.children).toEqual(
      "NUS Student"
    );
  });

  it("Button is working as expected", () => {
    const { getByTestId } = render(
      <FriendInfoScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByTestId("goBack"));

    expect(mockGoBack).toHaveBeenCalled();
  });
});
