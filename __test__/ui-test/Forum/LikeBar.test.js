import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import LikeBar from "../../../src/components/Forum/ForumPost/LikeBar";
import { likeStatus } from "../../../src/constants/Post";

const mockSetState = jest.fn();
const mockCallback = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useCallback: (fn, dependency) => mockCallback,
  useState: (initial) => [initial, mockSetState]
}));
jest.mock("@react-navigation/native", () => ({
  useIsFocused: () => true
}));
jest.mock("../../../src/services/Forum/HandleForumPost");

describe("Test Like Bar UI", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Like button is working as expected", () => {
    const { getByTestId } = render(
      <LikeBar forumId="forum-1" postId="post-1" />
    );

    fireEvent.press(getByTestId("like"));

    expect(mockSetState).toHaveBeenNthCalledWith(1, likeStatus.LIKE);
    expect(mockSetState).toHaveBeenNthCalledWith(2, 1);
    expect(mockCallback).toHaveBeenCalledWith(
      "forum-1",
      "post-1",
      likeStatus.LIKE
    );
  });

  it("Dislike button is working as expected", () => {
    const { getByTestId } = render(
      <LikeBar forumId="forum-1" postId="post-1" />
    );

    fireEvent.press(getByTestId("dislike"));

    expect(mockSetState).toHaveBeenNthCalledWith(1, likeStatus.DISLIKE);
    expect(mockSetState).toHaveBeenNthCalledWith(2, -1);
    expect(mockCallback).toHaveBeenCalledWith(
      "forum-1",
      "post-1",
      likeStatus.DISLIKE
    );
  });
});
