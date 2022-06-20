import { Timestamp } from "firestore-jest-mock/mocks/timestamp";

export const fakeFirebase = {
  database: {
    users: [
      {
        id: "yem123",
        username: "Sugiyem",
        img: "sugiyem-img",
        genres: ["Action", "Comedy"],
        _collections: {
          anime: [
            {
              id: "50265",
              title: "Spy x Family",
              image: "first-image-link",
              url: "first-url"
            },
            {
              id: "9253",
              title: "Steins;Gate",
              image: "steins-gate-link",
              url: "steins-gate-url"
            }
          ],
          friendRequestsSent: [{ id: "imba" }],
          friendRequestsReceived: [{ id: "cupu" }],
          friends: [{ id: "yem456" }],
          groupCreated: [{ id: "group1" }, { id: "group3" }],
          groupJoined: [{ id: "group1" }, { id: "group3" }],
          groupInvited: [{ id: "group2" }]
        }
      },
      {
        id: "yem456",
        username: "Yemima",
        img: "yemima-img",
        _collections: {
          friends: [{ id: "yem123" }],
          groupCreated: [{ id: "group2" }],
          groupJoined: [{ id: "group2", id: "group3" }]
        }
      },
      {
        id: "imba",
        username: "Elbert",
        img: "elbert-img",
        _collections: {
          friendRequestsReceived: [{ id: "yem123" }],
          groupJoined: [{ id: "group2" }]
        }
      },
      {
        id: "cupu",
        username: "Farrel",
        img: "farrel-img",
        _collections: {
          friendRequestsSent: [{ id: "yem123" }],
          groupInvited: [{ id: "group1" }]
        }
      },
      {
        id: "random",
        username: "Anonim",
        img: "anonim-img"
      }
    ],
    groups: [
      {
        id: "group1",
        name: "First group",
        description: "This is a group",
        img: "first-image-link",
        lastMessageAt: new Timestamp(1, 1),
        lastMessageText: "2nd-group-message",
        _collections: {
          members: [{ id: "yem123", showMessage: false, showNotif: false }],
          pendingMembers: [{ id: "cupu" }],
          messages: [
            { createdAt: new Timestamp(0, 0), text: "1st-group-message" },
            { createdAt: new Timestamp(1, 1), text: "2nd-group-message" }
          ]
        }
      },
      {
        id: "group2",
        name: "Second group",
        description: "This is a group",
        img: "second-image-link",
        _collections: {
          members: [{ id: "yem456" }, { id: "imba" }],
          pendingMembers: [{ id: "yem123" }]
        }
      },
      {
        id: "group3",
        name: "Third group",
        description: "This is a group",
        img: "third-image-link",
        lastMessageAt: new Timestamp(2, 2),
        lastMessageText: "other-group-message",
        _collections: {
          members: [
            { id: "yem123", showMessage: true, showNotif: true },
            { id: "yem456" }
          ],
          messages: [
            { createdAt: new Timestamp(2, 2), text: "other-group-message" }
          ]
        }
      }
    ],
    chatrooms: [
      {
        id: "yem123_yem456",
        lastMessageAt: new Timestamp(1, 1),
        lastMessageText: "2nd-message",
        showMessageToFirstUser: true,
        showMessageToSecondUser: true,
        showNotifToFirstUser: false,
        showNotifToSecondUser: false,
        _collections: {
          messages: [
            { createdAt: new Timestamp(0, 0), text: "1st-message" },
            { createdAt: new Timestamp(1, 1), text: "2nd-message" }
          ]
        }
      },
      {
        id: "imba_yem123",
        lastMessageAt: new Timestamp(2, 2),
        lastMessageText: "special-message",
        showMessageToFirstUser: true,
        showMessageToSecondUser: true,
        showNotifToFirstUser: false,
        showNotifToSecondUser: true,
        _collections: {
          messages: [
            { createdAt: new Timestamp(2, 2), text: "special-message" }
          ]
        }
      }
    ]
  },
  currentUser: { uid: "yem123" }
};

export const options = {
  includeIdsInData: true
};

export const flushPromises = () => new Promise(setImmediate);
