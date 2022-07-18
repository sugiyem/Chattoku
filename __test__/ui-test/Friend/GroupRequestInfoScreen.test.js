import React from "react";
import renderer from "react-test-renderer";
import GroupRequestInfoScreen from "../../../src/screens/Friend/GroupRequestInfoScreen";

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  push: jest.fn(),
  replace: jest.fn()
};
const mockRoute = {
  params: {
    groupData: {
      id: "weeb",
      name: "Weebs",
      description: "weebs only",
      img: "weeb-img"
    }
  }
};

jest.mock("../../../src/services/Friend/FetchGroup");

describe("Test Group Info Screen UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(
        <GroupRequestInfoScreen navigation={mockNavigation} route={mockRoute} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
