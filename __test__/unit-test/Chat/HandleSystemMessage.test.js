import {
  sendSystemMessageToGroup,
  sendSystemMessageToUser
} from "../../../src/services/Chat/HandleSystemMessage";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test system message", () => {
  const {
    mockCollection,
    mockDoc,
    mockSet
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const userID = admin.auth().currentUser.uid;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can send system message to user", async () => {
    const { messageID, time } = await sendSystemMessageToUser(
      "test system user",
      "yem456",
      admin
    );

    const expectedRoomID = `${userID}_yem456`;

    expect(mockCollection).toHaveBeenNthCalledWith(1, "chatRooms");
    expect(mockDoc).toHaveBeenNthCalledWith(1, expectedRoomID);
    expect(mockCollection).toHaveBeenNthCalledWith(2, "messages");
    expect(mockDoc).toHaveBeenNthCalledWith(2, messageID);
    expect(mockSet).toHaveBeenCalledWith({
      _id: messageID,
      text: "test system user",
      createdAt: time,
      system: true
    });
  });

  test("Can send system message to group", async () => {
    const { messageID, time } = await sendSystemMessageToGroup(
      "test system group",
      "group1",
      admin
    );

    expect(mockCollection).toHaveBeenNthCalledWith(1, "groups");
    expect(mockDoc).toHaveBeenNthCalledWith(1, "group1");
    expect(mockCollection).toHaveBeenNthCalledWith(2, "messages");
    expect(mockDoc).toHaveBeenNthCalledWith(2, messageID);
    expect(mockSet).toHaveBeenCalledWith({
      _id: messageID,
      text: "test system group",
      createdAt: time,
      system: true
    });
  });
});
