import { firebase } from "../../services/Firebase/Config";
import { sendPushNotification } from "../Miscellaneous/HandleNotification";
import { getCurrentUID } from "../Profile/FetchUserInfo";

export default async function NotifyAllFollowers(
  forumId,
  forumName,
  postTitle,
  app = firebase
) {
  let currentUID = getCurrentUID(app);
  let db = app.firestore();

  await db
    .collection("forums")
    .doc(forumId)
    .collection("followers")
    .get()
    .then(async (querySnapshot) => {
      const data = [];

      //First get the userId
      querySnapshot.forEach((doc) => {
        //Skip users with notification turned off
        if (!doc.data().isNotificationOn) return;

        //Skip the one who made the post
        if (doc.id === currentUID) return;

        data.push(doc.id);
      });

      let usersRef = db.collection("users");

      //Then send notifications
      data.map(async (userId) => {
        await usersRef
          .doc(userId)
          .get()
          .then((doc) => {
            const token = doc.data().notificationToken;
            sendPushNotification(token, "New On " + forumName, postTitle);
          });
      });
    });
}
