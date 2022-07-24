import React from "react";
import renderer from "react-test-renderer";
import ForumList from "../../../src/components/Forum/ForumList";

describe("Test Forum List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<ForumList data={[]} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
