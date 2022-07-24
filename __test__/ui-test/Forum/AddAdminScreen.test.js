import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AddAdminScreen from "../../../src/screens/Forum/ForumManagement/AddAdminScreen";

const mockGoBack = jest.fn();
const mockSearch = jest.fn();

jest.mock("../../../src/services/Friend/GetUserWithUsername", () => (args) => ({
  then: (callback) => mockSearch(args)
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: mockGoBack
  })
}));

describe("Test Add Admin Screen UI", () => {
  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(<AddAdminScreen />);

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
