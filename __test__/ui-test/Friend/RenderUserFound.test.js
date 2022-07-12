import React from "react";
import renderer from "react-test-renderer";
import RenderUserFound from "../../../src/components/Friend/RenderUserFound";

const mockUserData = {
  id: "yem456",
  username: "Yemima",
  bio: "CS Noob",
  img: "yemima-img"
};

jest.mock("../../../src/services/Friend/FetchFriendStatus");
jest.mock("../../../src/services/Friend/FriendshipStatus");
jest.mock("../../../src/services/Friend/HandleBlockedUser");

describe("Test User Found Card UI", () => {
  it("Renders correctly when no user found", () => {
    const tree = renderer.create(<RenderUserFound userData={null} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "noUser" }).props.children).toEqual(
      "There is no user with such username"
    );
  });

  it("Renders correctly when user found", () => {
    const tree = renderer.create(<RenderUserFound userData={mockUserData} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Yemima"
    );
    expect(instance.findByProps({ testID: "bio" }).props.children).toEqual(
      "CS Noob"
    );
    expect(instance.findByProps({ testID: "image" }).props.source).toEqual({
      uri: "yemima-img"
    });
  });
});
