import React from "react";
import renderer from "react-test-renderer";
import OwnerCard from "../../../src/components/Forum/ForumManagement/OwnerCard";

const mockUserData = {
  id: "yem456",
  username: "Yemima",
  img: "yemima-img"
};

describe("Test Owner Card UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<OwnerCard userData={mockUserData} />);
    const instance = tree.root;

    expect(
      instance.findByProps({ testID: "name" }).props.children
    ).toContainEqual("Yemima");
    expect(instance.findByProps({ testID: "image" }).props.source).toEqual({
      uri: "yemima-img"
    });
  });
});
