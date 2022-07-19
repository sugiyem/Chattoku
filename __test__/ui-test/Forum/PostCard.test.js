import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import PostCard from "../../../src/components/Forum/ForumPost/PostCard";
import Warning from "../../../src/components/Forum/Warning";

const mockPostData = {
  title: "Post Title",
  content: "Post Content",
  id: "post-1",
  uid: "yem123",
  img: [],
  timestamp: new Date(2022, 4, 8),
  lastEdited: new Date(2022, 5, 5)
};
const mockProps = {
  postData: mockPostData,
  forumId: "forum-1",
  isOwner: true,
  isBanned: false,
  isAuthorized: true
};
const mockNavigationState = {
  routes: [null, { params: { data: { owner: "yem123" } } }]
};
const mockUserData = {
  username: "Sugiyem",
  img: "sugiyem-img"
};
const mockNavigate = jest.fn();
const mockContext = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: (context) => mockContext
}));
jest.mock("../../../src/components/Forum/Warning");
jest.mock("../../../src/services/Forum/HandleForumPost");
jest.mock("../../../src/services/Profile/FetchUserInfo", () => ({
  ...jest.requireActual("../../../src/services/Profile/FetchUserInfo"),
  FetchInfoById: (uid, callback) => callback(mockUserData),
  getCurrentUID: () => "yem123"
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    getState: () => mockNavigationState
  }),
  useIsFocused: () => true
}));

describe("Test Post Card UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<PostCard {...mockProps} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "Post Title"
    );
    expect(
      instance.findByProps({ testID: "content" }).props.children
    ).toContainEqual("Post Content");
  });

  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(<PostCard {...mockProps} />);

    fireEvent.press(getByTestId("userInfo"));
    expect(mockContext).toHaveBeenCalledWith(mockUserData);

    fireEvent.press(getByTestId("comment"));
    expect(mockNavigate).toHaveBeenLastCalledWith("Post", {
      data: {
        title: "Post Title",
        content: "Post Content",
        postId: "post-1",
        forumId: "forum-1",
        uid: "yem123",
        img: [],
        isOwner: true,
        isBanned: false,
        timestamp: "May 08 2022",
        lastEdited: "Jun 05 2022"
      }
    });

    fireEvent.press(getByTestId("delete"));
    expect(Warning).toHaveBeenCalled();

    fireEvent.press(getByTestId("edit"));
    expect(mockNavigate).toHaveBeenLastCalledWith("EditPost", {
      data: {
        title: "Post Title",
        content: "Post Content",
        postId: "post-1",
        forumId: "forum-1",
        uid: "yem123",
        img: [],
        isOwner: true
      }
    });
  });
});
