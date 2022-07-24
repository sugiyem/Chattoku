import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import PastPostCard from "../../../src/components/Profile/PastPostCard";

const mockNavigate = jest.fn();
const mockForumData = {
  img: "forum-img",
  title: "First Forum"
};
const mockPostData = {
  timestamp: new Date(2022, 4, 8),
  lastEdited: new Date(2022, 5, 5),
  title: "Post Title",
  content: "Post Content"
};
const mockProps = { forumData: mockForumData, postData: mockPostData };

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate
  })
}));

describe("Test Past Post Card UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<PastPostCard {...mockProps} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "forumImg" }).props.source).toEqual({
      uri: "forum-img"
    });
    expect(
      instance.findByProps({ testID: "forumName" }).props.children
    ).toContainEqual("First Forum");
    expect(
      instance.findByProps({ testID: "postDate" }).props.children
    ).toContainEqual("May 08 2022");
    expect(
      instance.findByProps({ testID: "postTitle" }).props.children
    ).toEqual("Post Title");
    expect(
      instance.findByProps({ testID: "postContent" }).props.children
    ).toContainEqual("Post Content");
  });

  it("Navigation buttons are working correctly", () => {
    const { getByTestId } = render(<PastPostCard {...mockProps} />);

    // Go To Post button is working as expected
    fireEvent.press(getByTestId("goToPost"));
    expect(mockNavigate).toHaveBeenNthCalledWith(1, "Forum", {
      data: mockForumData
    });
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "Post", {
      data: {
        ...mockPostData,
        timestamp: "May 08 2022",
        lastEdited: "Jun 05 2022"
      }
    });

    // Go To Forum button is working as expected
    fireEvent.press(getByTestId("goToForum"));
    expect(mockNavigate).toHaveBeenLastCalledWith("Forum", {
      data: mockForumData
    });
  });
});
