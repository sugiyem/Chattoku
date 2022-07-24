import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import ProfileHomeScreen from "../../../src/screens/Profile/ProfileHomeScreen";
import Caution from "../../../src/components/Miscellaneous/Caution";
import { signOut } from "../../../src/services/Authentication/HandleAuthentication";

const mockNavigate = jest.fn();
const mockReplace = jest.fn();

jest.mock("../../../src/components/Miscellaneous/Caution");
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    replace: mockReplace
  })
}));
jest.mock("../../../src/services/Profile/FetchUserInfo");
jest.mock("../../../src/services/Anime/FetchFavoriteAnime");
jest.mock("../../../src/services/Authentication/HandleAuthentication");

describe("Test Profile Home Screen UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<ProfileHomeScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("All interactable components are working as expected", () => {
    const { getByTestId } = render(<ProfileHomeScreen />);

    // Edit button is working
    fireEvent.press(getByTestId("editProfile"));
    expect(mockNavigate).toHaveBeenLastCalledWith(
      "EditProfile",
      expect.anything()
    );

    // Previous Post button is working
    fireEvent.press(getByTestId("pastPosts"));
    expect(mockNavigate).toHaveBeenLastCalledWith("PastPosts");

    // Logout button is working
    fireEvent.press(getByTestId("logOut"));
    expect(mockReplace).toHaveBeenCalledWith("Login");
    expect(signOut).toHaveBeenCalled();

    // Delete button is working
    fireEvent.press(getByTestId("delete"));
    expect(Caution).toHaveBeenCalledWith(
      "This account will be deleted",
      expect.anything()
    );
  });
});
