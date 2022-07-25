import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import FollowedForumScreen from "../../../src/screens/Forum/FollowedForumScreen";

const mockNavigate = jest.fn();
const mockReplace = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    replace: mockReplace
  })
}));
jest.mock("../../../src/services/Forum/FetchFollowedForumData");
jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, jest.fn()]
}));

describe("Test Followed Forum Page UI", () => {
  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(<FollowedForumScreen />);

    fireEvent.press(getByTestId("homeForum"));
    expect(mockReplace).toHaveBeenCalledWith("ForumHome");

    fireEvent.press(getByTestId("createForum"));
    expect(mockNavigate).toHaveBeenCalledWith("CreateForum");
  });
});
