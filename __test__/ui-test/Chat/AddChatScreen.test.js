import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AddChatScreen from "../../../src/screens/Chat/AddChatScreen";
import GetUserWithUsername from "../../../src/services/Friend/GetUserWithUsername";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockNavigation = {
  goBack: mockGoBack,
  navigate: mockNavigate
};

jest.mock("../../../src/services/Friend/GetUserWithUsername");
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Add Chat Page UI", () => {
  it("Navigation buttons are working as expected", () => {
    const { getByTestId } = render(
      <AddChatScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("chatList"));
    fireEvent.press(getByTestId("friendList"));

    expect(mockGoBack).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("Friends", {
      screen: "FriendList",
      initial: false
    });
  });

  it("Search bar and button are working as expected", () => {
    const { getByTestId } = render(
      <AddChatScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByTestId("searchBar"), "Yemima");
    fireEvent.press(getByTestId("searchButton"));

    expect(GetUserWithUsername).toHaveBeenCalledWith(
      expect.objectContaining({ specifiedUsername: "Yemima" })
    );
  });
});
