import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ForumPostScreen from "../../../src/screens/Forum/ForumPostScreen";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockPostData = {
  title: "Post Title",
  content: "Post Content",
  uid: "yem123",
  forumId: "forum-1",
  postId: "post-1",
  img: [],
  timestamp: "08 May 2022",
  lastEdited: "05 Jun 2022",
  isEditing: false
};
const mockNavigationState = {
  routes: [null, null, { params: { data: mockPostData } }]
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate,
    getState: () => mockNavigationState
  }),
  useIsFocused: () => true
}));
jest.mock("../../../src/services/Forum/HandleForumPost");
jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("../../../src/services/Forum/FetchComment");
jest.mock("../../../src/services/Forum/HandleForumAdmin");

describe("Test Forum Post Screen UI", () => {
  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(<ForumPostScreen />);

    fireEvent.press(getByTestId("goBack"));
    expect(mockGoBack).toHaveBeenCalled();

    fireEvent.press(getByTestId("addComment"));
    expect(mockNavigate).toHaveBeenCalledWith("AddComment", {
      data: mockPostData
    });
  });
});
