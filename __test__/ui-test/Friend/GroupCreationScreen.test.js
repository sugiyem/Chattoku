import React from "react";
import renderer from "react-test-renderer";
import GroupCreationScreen from "../../../src/screens/Friend/GroupCreationScreen";

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  push: jest.fn(),
  replace: jest.fn()
};

describe("Test Group Creation UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(<GroupCreationScreen navigation={mockNavigation} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
