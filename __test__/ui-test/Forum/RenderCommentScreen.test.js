import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import RenderCommentScreen from "../../../src/components/Forum/ForumComment/RenderCommentScreen";
import {
  EditComment,
  AddComment
} from "../../../src/services/Forum/HandleComment";
import { renderType } from "../../../src/constants/Forum";

const mockGoBack = jest.fn();
const mockNavigationState = {
  routes: [
    null,
    null,
    {
      params: {
        data: {
          title: "title",
          content: "post",
          uid: "yem123",
          forumId: "forum-1",
          postId: "post-1",
          img: [],
          timestamp: "8 May 2022",
          lastEdited: "5 June 2022"
        }
      }
    },
    {
      params: {
        data: {
          forumId: "forum-1",
          postId: "post-1",
          commentId: "comment-1",
          content: "comment"
        }
      }
    }
  ]
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    getState: () => mockNavigationState
  })
}));
jest.mock("../../../src/services/Forum/HandleComment");
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Write Comment UI", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Interactable components for add comment are working as expected", () => {
    const { getByTestId } = render(
      <RenderCommentScreen renderScreenType={renderType.CREATE} />
    );

    fireEvent.press(getByTestId("goBack"));
    fireEvent.changeText(getByTestId("input"), "Elbert is OP");
    fireEvent.press(getByTestId("submit"));

    expect(mockGoBack).toHaveBeenCalled();
    expect(AddComment).toHaveBeenCalledWith(
      "forum-1",
      "post-1",
      "Elbert is OP",
      expect.anything(),
      expect.anything()
    );
  });

  it("Interactable components for edit comment are working as expected", () => {
    const { getByTestId } = render(
      <RenderCommentScreen renderScreenType={renderType.EDIT} />
    );

    fireEvent.press(getByTestId("goBack"));
    fireEvent.changeText(getByTestId("input"), "Elbert is OP");
    fireEvent.press(getByTestId("submit"));

    expect(mockGoBack).toHaveBeenCalled();
    expect(EditComment).toHaveBeenCalledWith(
      "forum-1",
      "post-1",
      "comment-1",
      "Elbert is OP",
      expect.anything(),
      expect.anything()
    );
  });
});
