import React from "react";
import renderer from "react-test-renderer";
import RenderGroupLists from "../../../src/components/Friend/RenderGroupLists";
import { groupListType } from "../../../src/constants/Group";

const mockGroupInfo = {
  id: "Group-1",
  name: "Weebs",
  description: "weebs only",
  img: "weeb-img"
};

describe("Test Group List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(
        <RenderGroupLists type={groupListType.GROUP} item={mockGroupInfo} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
