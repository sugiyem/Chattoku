import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Badge } from "react-native-elements";
import { fetchGroup, checkGroupInvitation } from "../../firebase/FetchGroup";
import { groupListType } from "../../constants/Group";
import RenderGroupLists from "../../components/Friend/RenderGroupLists";

const GroupListScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(null);
  const [isInvitationExist, setIsInvitationExist] = useState(false);

  useEffect(() => {
    return fetchGroup({
      onSuccess: (data) => {
        setGroups(data);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    return checkGroupInvitation({
      onFound: () => {
        setIsInvitationExist(true);
      },
      onNotFound: () => {
        setIsInvitationExist(false);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search group by name"
        style={styles.textInput}
      />

      <Text style={styles.title}>Groups List</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("FriendList")}
      >
        <Text>Back to friend's list</Text>
      </TouchableOpacity>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.groupButton}
          onPress={() => navigation.navigate("GroupCreation")}
        >
          <Text style={styles.createGroupText}>Create Group</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.groupButton}
          onPress={() => navigation.navigate("GroupRequests")}
        >
          <View style={styles.invitationContainer}>
            <Text style={styles.invitationText}>Group Invitations</Text>
            {isInvitationExist && (
              <Badge
                status="primary"
                value="!"
                containerStyle={styles.invitationBadge}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <RenderGroupLists
        type={groupListType.GROUP}
        items={groups.filter((item) =>
          item.name.toLowerCase().startsWith(search.toLowerCase())
        )}
        navigation={navigation}
        expandStatus={(index) => expand === index}
        changeExpand={setExpand}
      />
    </ScrollView>
  );
};

export default GroupListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    padding: 2
  },
  button: {
    margin: 5,
    padding: 5,
    backgroundColor: "aquamarine",
    borderRadius: 10
  },
  buttonGroup: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  groupButton: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "cyan",
    flex: 1
  },
  invitationContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  createGroupText: {
    textAlign: "center",
    fontSize: 12
  },
  invitationText: {
    textAlign: "center",
    fontSize: 12,
    flex: 4
  },
  invitationBadge: {
    flex: 1
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});
