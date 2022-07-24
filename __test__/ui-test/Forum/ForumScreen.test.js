import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ForumScreen from "../../../src/screens/Forum/ForumScreen";
import { getCurrentUID } from "../../../src/services/Profile/FetchUserInfo";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockForumData = {
  owner: "yem123",
  id: "forum-1",
  title: "First Forum",
  desc: "Forum Description",
  img: "forum-img",
  banner: "forum-banner"
};
const mockNavigationState = {
  routes: [null, { params: { data: mockForumData } }]
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate,
    getState: () => mockNavigationState
  })
}));
jest.mock("../../../src/services/Forum/HandleBannedUsers");
jest.mock("../../../src/services/Forum/FetchPost");
jest.mock("../../../src/services/Forum/HandleForum");
jest.mock("../../../src/services/Forum/HandleForumAdmin");
jest.mock("../../../src/services/Forum/HandleForumPost");
jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("../../../src/services/Friend/HandleBlockedUser");
jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");

describe("Test Forum Screen UI", () => {
  it("All interactable components are working as expected", () => {
    getCurrentUID.mockReturnValue("yem123");
    const { getByTestId } = render(<ForumScreen />);

    fireEvent.press(getByTestId("goBack"));
    expect(mockGoBack).toHaveBeenCalled();

    fireEvent.press(getByTestId("editForum"));
    expect(mockNavigate).toHaveBeenLastCalledWith("ManageForum", {
      data: mockForumData
    });

    fireEvent.press(getByTestId("addPost"));
    expect(mockNavigate).toHaveBeenLastCalledWith("AddPost", {
      data: mockForumData
    });
  });
});
