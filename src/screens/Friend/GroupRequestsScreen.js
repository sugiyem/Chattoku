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
import { fetchGroupInvitation } from "../../firebase/FetchGroup";
import RenderGroupLists, {
  renderType
} from "../../components/Friend/RenderGroupLists";

const GroupListScreen = ({ navigation }) => {
  const [groupRequests, setGroupRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(null);

  useEffect(() => {
    return fetchGroupInvitation({
      onSuccess: (data) => {
        setGroupRequests(data);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  console.log(groupRequests);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search group requests"
        style={styles.textInput}
      />

      <Text style={styles.title}>Group Requests List</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("GroupList")}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>

      <RenderGroupLists
        type={renderType.GROUP_INVITATION}
        items={groupRequests.filter((item) =>
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
  title: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});
