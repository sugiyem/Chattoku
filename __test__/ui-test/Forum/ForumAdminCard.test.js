import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ForumAdminCard from "../../../src/components/Forum/ForumManagement/ForumAdminCard";
import Warning from "../../../src/components/Forum/Warning";

const mockSetState = jest.fn();
const mockNavigationState = {
  routes: [
    null,
    {
      params: { data: { owner: "yem123", id: "forum-1", title: "First Forum" } }
    }
  ]
};

jest.mock("../../../src/components/Forum/Warning");
jest.mock("../../../src/services/Profile/FetchUserInfo", () => ({
  ...jest.requireActual("../../../src/services/Profile/FetchUserInfo"),
  getCurrentUID: () => "yem123"
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    getState: () => mockNavigationState
  })
}));
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockSetState],
  FetchInfoById: jest.fn()
}));

describe("Test Forum Admin Card UI", () => {
  it("Buttons are working as expected", () => {
    const { getByTestId } = render(
      <ForumAdminCard userId="yem123" authorities={[]} />
    );

    fireEvent.press(getByTestId("edit"));
    expect(mockSetState).toHaveBeenCalledWith(true);

    fireEvent.press(getByTestId("delete"));
    expect(Warning).toHaveBeenCalled();
  });
});
