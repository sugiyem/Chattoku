import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AddBannedScreen from "../../../src/screens/Forum/ForumManagement/AddBannedScreen";

const mockGoBack = jest.fn();
const mockSearch = jest.fn();
const mockNavigationState = {
  routes: [null, { params: { data: { owner: "yem123", id: "forum-1" } } }]
};

jest.mock("../../../src/services/Friend/GetUserWithUsername", () => (args) => ({
  then: (callback) => mockSearch(args)
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    getState: () => mockNavigationState
  })
}));
jest.mock("../../../src/services/Forum/HandleForumAdmin");
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Add Banned Screen UI", () => {
  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(<AddBannedScreen />);

    // Back button works properly
    fireEvent.press(getByTestId("goBack"));
    expect(mockGoBack).toHaveBeenCalled();

    // Search bar & button are working
    fireEvent.changeText(getByTestId("searchBar"), "Elbert CS God");
    fireEvent.press(getByTestId("searchButton"));
    expect(mockSearch).toHaveBeenCalledWith(
      expect.objectContaining({ specifiedUsername: "Elbert CS God" })
    );
  });
});
