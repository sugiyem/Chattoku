import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ForumCard from "../../../src/components/Forum/ForumCard";

const mockNavigate = jest.fn();
const mockForumData = {
  id: "forum-1",
  title: "First Forum",
  img: "logo-img",
  banner: "banner-img"
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate
  })
}));

describe("Test Forum Card UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<ForumCard forumData={mockForumData} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "banner" }).props.source).toEqual({
      uri: "banner-img"
    });
    expect(instance.findByProps({ testID: "logo" }).props.source).toEqual({
      uri: "logo-img"
    });
    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "First Forum"
    );
  });

  it("Continue button is working as expected", () => {
    const { getByTestId } = render(<ForumCard forumData={mockForumData} />);

    fireEvent.press(getByTestId("continueButton"));

    expect(mockNavigate).toHaveBeenCalledWith("Forum", { data: mockForumData });
  });
});
