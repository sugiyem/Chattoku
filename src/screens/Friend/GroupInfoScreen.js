import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

import { firebase } from "../../firebase/Config";
import {
  fetchGroupMembers,
  fetchPendingGroupMembers
} from "../../firebase/FetchGroup";
import RenderGroupDetail, {
  memberType
} from "../../components/Friend/RenderGroupDetail";

const GroupInfoScreen = ({ navigation, route }) => {
  const [members, setMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isMemberExpanded, setIsMemberExpanded] = useState(false);
  const [isPendingMemberExpanded, setIsPendingMemberExpanded] = useState(false);
  const groupInfo = route.params.groupData;

  console.log(members);

  useEffect(() => {
    return fetchGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setMembers(data);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchPendingGroupMembers({
      groupID: groupInfo.id,
      onSuccess: (data) => {
        setPendingMembers(data);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    const userID = firebase.auth().currentUser.uid;

    return firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("groupCreated")
      .onSnapshot(
        (querySnapshot) => {
          const groupCreated = [];
          querySnapshot.forEach((documentSnapshot) => {
            groupCreated.push(documentSnapshot.id);
          });

          if (groupCreated.includes(groupInfo.id)) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        },
        (error) => {
          Alert.alert("Error", error.message);
        }
      );
  }, []);

  return (
    <RenderGroupDetail
      type={isOwner ? memberType.OWNER : memberType.MEMBER}
      groupInfo={groupInfo}
      memberDetails={{
        data: members,
        isExpanded: isMemberExpanded,
        changeExpanded: setIsMemberExpanded
      }}
      pendingMemberDetails={{
        data: pendingMembers,
        isExpanded: isPendingMemberExpanded,
        changeExpanded: setIsPendingMemberExpanded
      }}
      navigation={navigation}
    />
  );
};

export default GroupInfoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  name: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10
  },
  description: {
    fontSize: 15,
    fontWeight: "600",
    color: "aquamarine",
    textAlign: "center",
    marginBottom: 10
  },
  button: {
    borderColor: "navy",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "aquamarine",
    alignSelf: "stretch",
    margin: 5,
    padding: 5
  },
  buttonText: {
    textAlign: "center",
    color: "#2e64e5"
  }
});
