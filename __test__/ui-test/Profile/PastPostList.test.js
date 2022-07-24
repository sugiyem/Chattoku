import React from "react";
import renderer from "react-test-renderer";
import PastPostList from "../../../src/components/Profile/PastPostList";

describe("Test Past Post List UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(<PastPostList postsData={[]} Header={() => <></>} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
