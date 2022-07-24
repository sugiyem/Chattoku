import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import CommentCard from "../../../src/components/Forum/ForumComment/CommentCard";
import Warning from "../../../src/components/Forum/Warning";

const mockContext = jest.fn();
const mockNavigate = jest.fn();
const mockNavigationState = {
  routes: [
    null,
    { params: { data: { owner: "yem" } } },
    { params: { data: { isBanned: false, isOwner: false } } }
  ]
};
const mockUserData = {
  img: "sugiyem-img",
  username: "Sugiyem"
};
const mockUID = "yem";
const mockProps = {
  content: "Hello",
  uid: "yem",
  forumId: "forum-1",
  postId: "post-1",
  id: "comment-1",
  timestamp: new Date(2022, 5, 8),
  lastEdited: new Date(2022, 6, 5),
  isAuthorized: false
};

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: (context) => mockContext
}));
jest.mock("../../../src/components/Forum/Warning");
jest.mock("../../../src/services/Profile/FetchUserInfo", () => ({
  ...jest.requireActual("../../../src/services/Profile/FetchUserInfo"),
  FetchInfoById: (uid, callback) => callback(mockUserData),
  getCurrentUID: () => mockUID
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    getState: () => mockNavigationState
  })
}));

describe("Test Comment Card UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<CommentCard {...mockProps} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "content" }).props.children
    ).toContainEqual("Hello");
  });

  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(<CommentCard {...mockProps} />);

    // User's avatar is pressable
    fireEvent.press(getByTestId("userInfo"));
    expect(mockContext).toHaveBeenCalledWith(mockUserData);

    // Delete button works properly
    fireEvent.press(getByTestId("deleteButton"));
    expect(Warning).toHaveBeenCalled();

    // Edit button works properly
    fireEvent.press(getByTestId("editButton"));
    expect(mockNavigate).toHaveBeenCalledWith("EditComment", {
      data: {
        content: "Hello",
        forumId: "forum-1",
        postId: "post-1",
        commentId: "comment-1"
      }
    });
  });
});
