import React from "react";
import renderer from "react-test-renderer";
import EditGroupScreen from "../../../src/screens/Friend/EditGroupScreen";

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  push: jest.fn(),
  replace: jest.fn()
};
const mockRoute = {
  params: {
    groupInfo: { name: "Weebs", description: "weebs only", img: "weebs-img" }
  }
};

describe("Test Group Creation UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(<EditGroupScreen navigation={mockNavigation} route={mockRoute} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
