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
          groupJoined: [{ id: "group1" }, { id: "group3" }],
          groupInvited: [{ id: "group2" }],
          follows: [{ id: "forum-1" }],
          likes: [{ id: "forum-1forum-1-post-1" }],
          dislikes: [{ id: "forum-1forum-1-post-2" }],
          posts: [
            {
              id: "forum-1forum-1-post-1",
              forumId: "forum-1",
              postId: "forum-1-post-1",
              timestamp: new Timestamp(2, 2)
            },
            {
              id: "forum-2forum-2-post-1",
              forumId: "forum-2",
              postId: "forum-2-post-1",
              timestamp: new Timestamp(1, 1)
            }
          ]
        }
      },
      {
        id: "yem456",
        username: "Yemima",
        img: "yemima-img",
        _collections: {
          friends: [{ id: "yem123" }],
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
          groupInvited: [{ id: "group1" }],
          groupJoined: [{ id: "group3" }]
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
        owner: "yem123",
        name: "First group",
        description: "This is a group",
        img: "first-image-link",
        lastMessageAt: new Timestamp(1, 1),
        lastMessageText: "2nd-group-message",
        _collections: {
          admins: [{ id: "yem123" }],
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
        owner: "yem456",
        name: "Second group",
        description: "This is a group",
        img: "second-image-link",
        _collections: {
          admins: [{ id: "yem456" }],
          members: [{ id: "yem456" }, { id: "imba" }],
          pendingMembers: [{ id: "yem123" }]
        }
      },
      {
        id: "group3",
        owner: "yem123",
        name: "Third group",
        description: "This is a group",
        img: "third-image-link",
        lastMessageAt: new Timestamp(2, 2),
        lastMessageText: "other-group-message",
        _collections: {
          admins: [{ id: "yem123" }, { id: "yem456" }],
          members: [
            { id: "yem123", showMessage: true, showNotif: true },
            { id: "yem456" },
            { id: "cupu" }
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
    ],
    forums: [
      {
        id: "forum-1",
        owner: "yem123",
        title: "First Forum",
        banner: "first-forum-banner",
        img: "first-forum-img",
        desc: "first-forum-desc",
        _collections: {
          posts: [
            {
              id: "forum-1-post-1",
              uid: "yem123",
              title: "First Post Title",
              content: "This is my first post",
              _collections: {
                likes: [{ id: "yem123" }],
                comments: [
                  {
                    id: "comment-1",
                    uid: "yem123",
                    content: "Hi, I'm Sugiyem"
                  },
                  { id: "comment-2", uid: "cupu", content: "Hi, I'm Farrel" }
                ]
              }
            },
            {
              id: "forum-1-post-2",
              _collections: { dislikes: [{ id: "yem123" }] }
            },
            { id: "forum-1-post-3" }
          ],
          admins: [
            { id: "cupu", uid: "cupu", authorities: ["Ban Users From Forum"] }
          ],
          banned: [{ id: "random", reason: "NSFW comments" }]
        }
      },
      {
        id: "forum-2",
        owner: "yem456",
        title: "Second Forum",
        banner: "second-forum-banner",
        img: "second-forum-img",
        desc: "second-forum-desc",
        _collections: {
          posts: [
            {
              id: "forum-2-post-1",
              uid: "yem123",
              title: "Real First Post",
              content: "Actually, this is my first post"
            }
          ],
          admins: [
            {
              id: "yem123",
              uid: "yem123",
              authorities: ["Ban Users From Forum"]
            }
          ]
        }
      },
      {
        id: "forum-3",
        _collections: {
          admins: [
            { id: "yem123", uid: "yem123", authorities: ["Delete Posts"] }
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
