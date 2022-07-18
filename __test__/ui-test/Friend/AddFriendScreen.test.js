import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AddFriendScreen from "../../../src/screens/Friend/AddFriendScreen";
import GetUserWithUsername from "../../../src/services/Friend/GetUserWithUsername";

const mockReplace = jest.fn();
const mockNavigation = {
  replace: mockReplace
};

jest.mock("../../../src/services/Friend/GetUserWithUsername");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");
jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Add Friend UI", () => {
  it("Navigation button is working as expected", () => {
    const { getByTestId } = render(
      <AddFriendScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("friendList"));

    expect(mockReplace).toHaveBeenCalledWith("FriendList");
  });

  it("Search bar and button are working as expected", () => {
    const { getByTestId } = render(
      <AddFriendScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByTestId("searchBar"), "Yemima");
    fireEvent.press(getByTestId("searchButton"));

    expect(GetUserWithUsername).toHaveBeenCalledWith(
      expect.objectContaining({ specifiedUsername: "Yemima" })
    );
  });
});
