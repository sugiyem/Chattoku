import React from "react";
import renderer from "react-test-renderer";
import ContactImage from "../../../src/components/Friend/ContactImage";

const mockImage = { img: "chattoku-img" };

describe("Test Contact Image UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<ContactImage item={mockImage} />);
    const instance = tree.root;

    expect(instance.findByProps({ testID: "image" }).props.source).toEqual({
      uri: "chattoku-img"
    });
  });
});
