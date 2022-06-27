import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import AnimeSearchBar from "../../../src/components/Anime/AnimeSearchBar";

describe("Test Anime search bar UI", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<AnimeSearchBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Can change input and press button", () => {
    const mockChangeText = jest.fn();
    const mockPressSearchButton = jest.fn();
    const mockValue = "";

    const { getByTestId } = render(
      <AnimeSearchBar
        search={mockValue}
        onChangeText={mockChangeText}
        onPressSearchButton={mockPressSearchButton}
      />
    );

    fireEvent.press(getByTestId("searchButton"));
    fireEvent.changeText(getByTestId("searchInput"));

    expect(mockChangeText).toHaveBeenCalled();
    expect(mockPressSearchButton).toHaveBeenCalled();
  });
});
