import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ManageAdminCard from "../../../src/components/Forum/ForumManagement/ManageAdminCard";
import {
  addAdmin,
  editAdminPower
} from "../../../src/services/Forum/HandleForumAdmin";
import { renderType } from "../../../src/constants/Forum";

const mockUserData = {
  id: "yem456",
  username: "Yemima",
  img: "yemima-img",
  notificationToken: "yemima-token"
};
const mockNavigationState = {
  routes: [null, { params: { data: { id: "forum-1", title: "First Forum" } } }]
};
const mockSuccess = jest.fn();
const mockAuthorities = ["Delete Posts"];

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    getState: () => mockNavigationState
  })
}));
jest.mock("../../../src/services/Forum/HandleForumAdmin");

describe("Test Manage Admin Card UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <ManageAdminCard userData={mockUserData} authorities={mockAuthorities} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "image" }).props.source).toEqual({
      uri: "yemima-img"
    });
    expect(
      instance.findByProps({ testID: "name" }).props.children
    ).toContainEqual("Yemima");
  });

  it("Submit button for adding admin works as expected", () => {
    const { getByTestId } = render(
      <ManageAdminCard
        userData={mockUserData}
        type={renderType.CREATE}
        onSuccessfulEdit={mockSuccess}
      />
    );

    // Add Admin is not called as no authorities chosen
    fireEvent.press(getByTestId("submitButton"));
    expect(addAdmin).not.toHaveBeenCalled();
  });

  it("Submit button for editing admin works as expected", () => {
    const { getByTestId } = render(
      <ManageAdminCard
        userData={mockUserData}
        type={renderType.EDIT}
        onSuccessfulEdit={mockSuccess}
        authorities={mockAuthorities}
      />
    );

    // Edit Admin is called properly
    fireEvent.press(getByTestId("submitButton"));
    expect(editAdminPower).toHaveBeenCalledWith(
      "forum-1",
      "yem456",
      mockAuthorities,
      expect.anything()
    );
  });
});
