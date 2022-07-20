import React from "react";
import renderer from "react-test-renderer";
import GroupInfoScreen from "../../../src/screens/Friend/GroupInfoScreen";

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
jest.mock("../../../src/services/Friend/FetchGroupAdmin");
jest.mock("../../../src/services/Profile/FetchUserInfo");

describe("Test Group Info Screen UI", () => {
  it("Renders correctly", () => {
    const tree = renderer
      .create(<GroupInfoScreen navigation={mockNavigation} route={mockRoute} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
