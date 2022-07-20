import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ForumHomeScreen from "../../../src/screens/Forum/ForumHomeScreen";

const mockNavigate = jest.fn();
const mockReplace = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    replace: mockReplace
  })
}));
jest.mock("../../../src/services/Forum/FetchForumData");

describe("Test Forum Home Page UI", () => {
  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(<ForumHomeScreen />);

    fireEvent.press(getByTestId("followedForum"));
    expect(mockReplace).toHaveBeenCalledWith("FollowedForums");

    fireEvent.press(getByTestId("createForum"));
    expect(mockNavigate).toHaveBeenCalledWith("CreateForum");
  });
});
