import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AddBlockedUserScreen from "../../../src/screens/Friend/AddBlockedUserScreen";
import GetUserWithUsername from "../../../src/services/Friend/GetUserWithUsername";

const mockReplace = jest.fn();
const mockNavigation = {
  replace: mockReplace
};

jest.mock("../../../src/services/Friend/GetUserWithUsername");
jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Add Friend UI", () => {
  it("Navigation button is working as expected", () => {
    const { getByTestId } = render(
      <AddBlockedUserScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("blockedList"));

    expect(mockReplace).toHaveBeenCalledWith("BlockedUserList");
  });

  it("Search bar and button are working as expected", () => {
    const { getByTestId } = render(
      <AddBlockedUserScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByTestId("searchBar"), "Yem");
    fireEvent.press(getByTestId("searchButton"));

    expect(GetUserWithUsername).toHaveBeenCalledWith(
      expect.objectContaining({ specifiedUsername: "Yem" })
    );
  });
});
