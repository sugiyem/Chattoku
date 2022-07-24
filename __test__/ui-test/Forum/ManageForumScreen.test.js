import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ManageForumScreen from "../../../src/screens/Forum/ForumManagement/ManageForumScreen";
import { getCurrentUID } from "../../../src/services/Profile/FetchUserInfo";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockNavigationState = {
  routes: [null, { params: { data: { id: "forum-1", owner: "yem123" } } }]
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate,
    getState: () => mockNavigationState
  })
}));
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Manage Forum Screen UI", () => {
  it("All interactable components are working as expected", () => {
    getCurrentUID.mockReturnValue("yem123");
    const { getByTestId } = render(<ManageForumScreen />);

    fireEvent.press(getByTestId("goBack"));
    expect(mockGoBack).toHaveBeenCalled();

    fireEvent.press(getByTestId("editForum"));
    expect(mockNavigate).toHaveBeenLastCalledWith("EditForum");

    fireEvent.press(getByTestId("bannedUsers"));
    expect(mockNavigate).toHaveBeenLastCalledWith("BannedUsers");

    fireEvent.press(getByTestId("admins"));
    expect(mockNavigate).toHaveBeenLastCalledWith("Admins");
  });
});
