import React from "react";
import renderer from "react-test-renderer";
import ContactBar from "../../../src/components/Friend/ContactBar";
import { contactType } from "../../../src/constants/Contact";

const mockUser = {
  username: "Yemima",
  bio: "yem",
  img: "yem-img"
};

const mockGroup = {
  name: "Weebs",
  description: "Weebs only",
  img: "weeb-img"
};

describe("Test Contact Bar UI", () => {
  it("Renders correctly for user", () => {
    const tree = renderer.create(
      <ContactBar type={contactType.USER} item={mockUser} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Yemima"
    );
    expect(instance.findByProps({ testID: "info" }).props.children).toEqual(
      "yem"
    );
  });

  it("Renders correctly for group", () => {
    const tree = renderer.create(
      <ContactBar type={contactType.GROUP} item={mockGroup} />
    );
    const instance = tree.root;

    expect(instance.findByProps({ testID: "name" }).props.children).toEqual(
      "Weebs"
    );
    expect(instance.findByProps({ testID: "info" }).props.children).toEqual(
      "Weebs only"
    );
  });
});
