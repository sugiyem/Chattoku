import React from "react";
import renderer from "react-test-renderer";
import RenderUserLists from "../../../src/components/Friend/RenderUserLists";
import { friendshipType } from "../../../src/constants/Friend";

const mockUserInfo = {
  id: "yem456",
  username: "Yemima",
  bio: "CS Noob",
  img: "yemima-img"
};

describe("Test User List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(
        <RenderUserLists type={friendshipType.FRIEND} item={mockUserInfo} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
