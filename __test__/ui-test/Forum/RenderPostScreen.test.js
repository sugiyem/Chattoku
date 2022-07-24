import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import RenderPostScreen from "../../../src/components/Forum/ForumPost/RenderPostScreen";
import { renderType } from "../../../src/constants/Forum";
import {
  pickImageFromLibrary,
  removeAllImageFromCloud
} from "../../../src/services/Miscellaneous/HandleImage";
import { editPost, addPost } from "../../../src/services/Forum/HandleForumPost";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockNavigationState = {
  routes: [
    null,
    { params: { data: { id: "forum-1", title: "First Forum" } } },
    {
      params: {
        data: {
          title: "Post Title",
          content: "Post Content",
          forumId: "forum-1",
          postId: "post-1",
          img: ["image-1"]
        }
      }
    }
  ]
};

jest.mock("../../../src/services/Miscellaneous/HandleImage");
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    getState: () => mockNavigationState,
    goBack: mockGoBack,
    navigate: mockNavigate
  })
}));
jest.mock("../../../src/services/Forum/HandleForumPost");

describe("Test Write Post Page UI", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("All interactable components are working as expected for add post", () => {
    const { getByTestId, queryByTestId } = render(
      <RenderPostScreen renderScreenType={renderType.CREATE} />
    );

    // No add other image & remove image buttons
    expect(queryByTestId("addOtherImage")).toBeNull();
    expect(queryByTestId("removeImage")).toBeNull();

    // Add first image button works properly
    fireEvent.press(getByTestId("addFirstImage"));
    expect(pickImageFromLibrary).toHaveBeenCalled();

    // Back button works properly
    fireEvent.press(getByTestId("goBack"));
    expect(removeAllImageFromCloud).toHaveBeenCalledWith([]);
    expect(mockGoBack).toHaveBeenCalled();

    // Submit button works properly
    fireEvent.changeText(getByTestId("titleInput"), "Post Title");
    fireEvent.changeText(getByTestId("contentInput"), "Post Content");
    fireEvent.press(getByTestId("submit"));
    expect(addPost).toHaveBeenCalledWith(
      "forum-1",
      { title: "Post Title", content: "Post Content", img: [] },
      "First Forum",
      expect.anything(),
      expect.anything()
    );
  });

  it("All interactable components are working as expected for edit post", () => {
    const { getByTestId, queryByTestId } = render(
      <RenderPostScreen renderScreenType={renderType.EDIT} />
    );

    // No Add First Image button as current post has existing image
    expect(queryByTestId("addFirstImage")).toBeNull();

    // Submit button works properly
    fireEvent.press(getByTestId("removeImage"));
    fireEvent.changeText(getByTestId("titleInput"), "Edited Title");
    fireEvent.changeText(getByTestId("contentInput"), "Edited Content");
    fireEvent.press(getByTestId("submit"));
    expect(editPost).toHaveBeenCalledWith(
      "forum-1",
      "post-1",
      { title: "Edited Title", content: "Edited Content", img: [] },
      expect.anything(),
      expect.anything()
    );
  });
});
