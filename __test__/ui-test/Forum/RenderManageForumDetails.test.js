import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import RenderManageForumDetails from "../../../src/components/Forum/RenderManageForumDetails";
import { renderType } from "../../../src/constants/Forum";
import {
  pickImageFromCamera,
  pickImageFromLibrary
} from "../../../src/services/Miscellaneous/HandleImage";
import {
  createForum,
  editForum
} from "../../../src/services/Forum/HandleForum";

const mockGoBack = jest.fn();
const mockNavigationState = {
  routes: [
    null,
    {
      params: {
        data: {
          img: "forum-img",
          banner: "forum-banner",
          title: "First Forum",
          desc: "Forum Description"
        }
      }
    }
  ]
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    getState: () => mockNavigationState,
    goBack: mockGoBack
  })
}));
jest.mock("../../../src/services/Miscellaneous/HandleImage");
jest.mock("../../../src/services/Forum/HandleForum");

describe("Test Write Forum Page UI", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("All interactable components are working as expected for create forum", () => {
    const { getByTestId } = render(
      <RenderManageForumDetails manageType={renderType.CREATE} />
    );

    // Back button is working properly
    fireEvent.press(getByTestId("goBack"));
    expect(mockGoBack).toHaveBeenCalled();

    // Upload banner image is working properly
    fireEvent.press(getByTestId("banner"));
    fireEvent.press(getByTestId("pickFromCamera"));
    expect(pickImageFromCamera).toHaveBeenCalled();

    fireEvent.press(getByTestId("cancel"));

    // Upload profile image is working properly
    fireEvent.press(getByTestId("profile"));
    fireEvent.press(getByTestId("pickFromLibrary"));
    expect(pickImageFromLibrary).toHaveBeenCalled();

    fireEvent.press(getByTestId("cancel"));

    // Submit button is working properly
    fireEvent.changeText(getByTestId("titleInput"), "Forum Title");
    fireEvent.changeText(getByTestId("descInput"), "Forum Desc");
    fireEvent.press(getByTestId("submit"));
    expect(createForum).toHaveBeenCalledWith(
      { img: "", banner: "", title: "Forum Title", desc: "Forum Desc" },
      expect.anything()
    );
  });

  it("All interactable components are working as expected for edit forum", () => {
    const { getByTestId } = render(
      <RenderManageForumDetails manageType={renderType.EDIT} />
    );

    // Back button is working properly
    fireEvent.press(getByTestId("goBack"));
    expect(mockGoBack).toHaveBeenCalled();

    // Submit button is working properly
    fireEvent.press(getByTestId("banner"));
    fireEvent.press(getByTestId("removeImage"));
    fireEvent.changeText(getByTestId("titleInput"), "Edited Forum");
    fireEvent.changeText(getByTestId("descInput"), "Edited Desc");
    fireEvent.press(getByTestId("submit"));
    expect(editForum).toHaveBeenCalledWith(
      {
        img: "forum-img",
        banner: "",
        title: "Edited Forum",
        desc: "Edited Desc"
      },
      expect.anything()
    );
  });
});
