import { firebase } from "../../services/Firebase/Config";
import { sendPushNotification } from "../Miscellaneous/HandleNotification";

export default async function NotifyAllFollowers(
  forumId,
  forumName,
  postTitle,
  app = firebase
) {
  let db = app.firestore();

  await db
    .collection("forums")
    .doc(forumId)
    .collection("followers")
    .get()
    .then(async (querySnapshot) => {
      console.log("This Part Is Reached");
      const data = [];

      //First get the userId
      querySnapshot.forEach((doc) => {
        //Skip users with notification turned off
        if (!doc.data().isNotificationOn) return;

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
