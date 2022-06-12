import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteGroup } from "../../firebase/HandleGroup";

const GroupOwnerButtons = ({ groupInfo, navigation }) => {
  return (
    <View style={styles.buttonGroup}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("EditGroup", { groupInfo: groupInfo });
        }}
      >
        <Text style={styles.buttonText}>Edit Group Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("AddGroupMember", {
            groupID: groupInfo.id
          });
        }}
      >
        <Text style={styles.buttonText}>Add Members</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert(
            "This group will be deleted",
            "This action is irreversible. Do you want to continue?",
            [
              {
                text: "Cancel"
              },
              {
                text: "Continue",
                onPress: async () =>
                  await deleteGroup(groupInfo.id).finally(() =>
                    navigation.replace("GroupList")
                  )
              }
            ]
          );
        }}
      >
        <Text style={styles.buttonText}>Delete Group</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupOwnerButtons;

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    marginBottom: 10
  },
  button: {
    borderColor: "navy",
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5
  },
  buttonText: {
    color: "#2e64e5",
    fontSize: 13
  }
});
