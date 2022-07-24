import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import BannedUsersScreen from "../../../src/screens/Forum/ForumManagement/BannedUsersScreen";
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
jest.mock("../../../src/services/Forum/HandleForumAdmin");
jest.mock("../../../src/services/Forum/HandleBannedUsers");

describe("Test Banned User Screen UI", () => {
  it("All interactable components are working as expected", () => {
    getCurrentUID.mockReturnValue("yem123");
    const { getByTestId } = render(<BannedUsersScreen />);

    fireEvent.press(getByTestId("goBack"));
    expect(mockGoBack).toHaveBeenCalled();

    fireEvent.press(getByTestId("addBanned"));
    expect(mockNavigate).toHaveBeenCalledWith("AddBanned");
  });
});
