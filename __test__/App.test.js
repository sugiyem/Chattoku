import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("../src/services/Firebase/Config", () => ({
  firebase: {
    auth: () => ({
      onAuthStateChanged: jest.fn()
    })
  }
}));

describe("<App />", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
