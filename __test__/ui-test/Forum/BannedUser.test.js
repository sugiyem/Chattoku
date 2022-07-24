import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import BannedUser from "../../../src/components/Forum/ForumManagement/BannedUser";
import Warning from "../../../src/components/Forum/Warning";

const mockNavigationState = {
  routes: [null, { params: { data: { id: "forum-1" } } }]
};
const mockProps = { userId: "yem123", reason: "spam" };

jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("../../../src/components/Forum/Warning");
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    getState: () => mockNavigationState
  })
}));

describe("Test Banned User Card UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<BannedUser {...mockProps} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "reason" }).props.children
    ).toContainEqual("spam");
  });

  it("Delete button is working as expected when authorized", () => {
    const { getByTestId } = render(
      <BannedUser {...mockProps} isAuthorized={true} />
    );

    fireEvent.press(getByTestId("delete"));

    expect(Warning).toHaveBeenCalled();
  });

  it("Can't access delete button if not authorized", () => {
    const { queryByTestId } = render(
      <BannedUser {...mockProps} isAuthorized={false} />
    );

    expect(queryByTestId("delete")).toBeNull();
  });
});
