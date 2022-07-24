import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import RenderFriendSection from "../../../src/components/Forum/RenderFriendSection";
import {
  addFriend,
  acceptFriendRequest,
  cancelFriendRequest
} from "../../../src/services/Friend/HandleFriend";
import { getFriendshipStatus } from "../../../src/services/Friend/FriendshipStatus";
import { friendshipType } from "../../../src/constants/Friend";
import Warning from "../../../src/components/Forum/Warning";

jest.mock("../../../src/components/Forum/Warning");
jest.mock("../../../src/services/Friend/HandleFriend");
jest.mock("../../../src/services/Friend/FriendshipStatus");
jest.mock("../../../src/services/Friend/FetchFriendStatus");

describe("Test Friend Section Overlay UI", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Working as expected when other user is a friend", () => {
    getFriendshipStatus.mockReturnValue(friendshipType.FRIEND);
    const { getByTestId } = render(<RenderFriendSection userId="yem456" />);

    fireEvent.press(getByTestId("unfriend"));
    expect(Warning).toHaveBeenCalled();
  });

  it("Working as expected when other user sends a request", () => {
    getFriendshipStatus.mockReturnValue(friendshipType.RECEIVING_REQUEST);
    const { getByTestId } = render(<RenderFriendSection userId="yem456" />);

    fireEvent.press(getByTestId("accept"));
    expect(acceptFriendRequest).toHaveBeenCalledWith("yem456");

    fireEvent.press(getByTestId("decline"));
    expect(Warning).toHaveBeenCalled();
  });

  it("Working as expected when other user gets a request", () => {
    getFriendshipStatus.mockReturnValue(friendshipType.WAITING_RESPONSE);
    const { getByTestId } = render(<RenderFriendSection userId="yem456" />);

    fireEvent.press(getByTestId("cancel"));
    expect(cancelFriendRequest).toHaveBeenCalledWith("yem456");
  });

  it("Working as expected when other user is not a friend", () => {
    getFriendshipStatus.mockReturnValue(friendshipType.NON_FRIEND);
    const { getByTestId } = render(<RenderFriendSection userId="yem456" />);

    fireEvent.press(getByTestId("addFriend"));
    expect(addFriend).toHaveBeenCalledWith("yem456");
  });
});
