import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import MainPostCard from "../../../src/components/Forum/ForumPost/MainPostCard";

const mockContext = jest.fn();
const mockProps = {
  title: "Post Title",
  content: "Post Content",
  uid: "yem123",
  forumId: "forum-1",
  postId: "post-1",
  img: [],
  timestamp: "05 June 2022",
  lastEdited: "08 May 2022",
  isEditing: true
};
const mockUserData = {
  username: "Sugiyem",
  img: "sugiyem-img"
};

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: (context) => mockContext
}));
jest.mock("../../../src/services/Profile/FetchUserInfo", () => ({
  FetchInfoById: (uid, callback) => callback(mockUserData)
}));
jest.mock("../../../src/services/Forum/HandleForumPost");

describe("Test Main Post Card UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<MainPostCard {...mockProps} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "content" }).props.children
    ).toContainEqual("Post Content");
  });

  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(<MainPostCard {...mockProps} />);

    fireEvent.press(getByTestId("userInfo"));

    expect(mockContext).toHaveBeenCalledWith(mockUserData);
  });
});
