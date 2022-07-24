import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ForumHeader from "../../../src/components/Forum/ForumHeader";
import {
  getForumFollowData,
  followForum,
  updateNotification
} from "../../../src/services/Forum/HandleForum";
import Warning from "../../../src/components/Forum/Warning";

const mockProps = {
  id: "forum-1",
  img: "forum-logo",
  title: "First Forum",
  banner: "forum-banner",
  desc: "Forum Description",
  isOwner: false
};

jest.mock("../../../src/services/Forum/HandleForum");
jest.mock("../../../src/components/Forum/Warning");

describe("Test Forum Header UI", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    getForumFollowData.mockImplementation((uid, callback) =>
      callback({ isFollowed: true, isNotificationOn: true })
    );
  });

  it("Renders correctly", () => {
    const tree = renderer.create(<ForumHeader {...mockProps} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "title" }).props.children).toEqual(
      "First Forum"
    );
    expect(instance.findByProps({ testID: "logo" }).props.source).toEqual({
      uri: "forum-logo"
    });
    expect(instance.findByProps({ testID: "banner" }).props.source).toEqual({
      uri: "forum-banner"
    });
  });

  it("All interactable components are working as expected when forum is followed", () => {
    const { getByTestId, queryByTestId } = render(
      <ForumHeader {...mockProps} />
    );

    // No Turn Notification Off button
    expect(queryByTestId("turnOff")).toBeNull();

    // Notification button is working as expected
    fireEvent.press(getByTestId("turnOn"));
    expect(updateNotification).toHaveBeenCalledWith(
      "forum-1",
      false,
      expect.anything()
    );

    // Unfollow button works properly
    fireEvent.press(getByTestId("followButton"));
    expect(Warning).toHaveBeenCalled();
  });

  it("All interactable components are working as expected when forum is followed", () => {
    getForumFollowData.mockImplementation((uid, callback) =>
      callback({ isFollowed: false })
    );

    const { getByTestId, queryByTestId } = render(
      <ForumHeader {...mockProps} />
    );

    // No notification buttons
    expect(queryByTestId("turnOn")).toBeNull();
    expect(queryByTestId("turnOff")).toBeNull();

    // Follow button works properly
    fireEvent.press(getByTestId("followButton"));
    expect(followForum).toHaveBeenCalledWith("forum-1", expect.anything());
  });
});
