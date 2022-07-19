import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import RenderUserToBan from "../../../src/components/Forum/ForumManagement/RenderUserToBan";
import { addBannedUsers } from "../../../src/services/Forum/HandleBannedUsers";

const mockProps = {
  username: "Yemima",
  img: "yemima-img",
  id: "yem456"
};
const mockNavigationState = {
  routes: [null, { params: { data: { id: "forum-1" } } }]
};
const mockAddBanned = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    getState: () => mockNavigationState
  })
}));
jest.mock("../../../src/services/Forum/HandleBannedUsers", () => ({
  addBannedUsers: (...args) => ({
    then: (arg) => mockAddBanned(...args)
  })
}));

describe("Test Render User to Ban UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<RenderUserToBan {...mockProps} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Yemima"
    );
    expect(instance.findByProps({ testID: "image" }).props.source).toEqual({
      uri: "yemima-img"
    });
  });

  it("Interactable components are working as expected", () => {
    const { getByTestId } = render(<RenderUserToBan {...mockProps} />);

    fireEvent.changeText(getByTestId("banInput"), "Spam");
    fireEvent.press(getByTestId("banButton"));

    expect(mockAddBanned).toHaveBeenCalledWith("forum-1", "yem456", "Spam");
  });
});
