import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import EditGenreScreen from "../../../src/screens/Profile/EditGenreScreen";

const mockGoBack = jest.fn();
const mockNavigation = {
  goBack: mockGoBack
};
const mockSetState = jest.fn();

jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState]
}));

describe("Test Edit Genre UI", () => {
  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(
      <EditGenreScreen navigation={mockNavigation} />
    );

    // Favorite checkbox is working
    fireEvent.press(getByTestId("favoriteCheckBox"));
    expect(mockSetState).toHaveBeenLastCalledWith(false);

    // Search bar is working
    fireEvent.changeText(getByTestId("searchBar"), "Action");
    expect(mockSetState).toHaveBeenLastCalledWith("Action");

    // Non-favorite checkbox is working
    fireEvent.press(getByTestId("nonFavoriteCheckBox"));
    expect(mockSetState).toHaveBeenLastCalledWith(false);

    // Go back button is working
    fireEvent.press(getByTestId("goBack"));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
