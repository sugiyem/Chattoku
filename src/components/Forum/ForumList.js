import {
  Alert,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import FetchForumData from "./FetchForumData";
import ForumCard from "./ForumCard";
import { useState, useEffect } from "react";

const initialData = [];

const ForumList = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");

  const filteredData = data.filter((forum) =>
    forum.title.toLowerCase().startsWith(search.toLowerCase())
  );

  // console.log(data);

  useEffect(() => {
    // console.log("useEffect triggered");
    return FetchForumData(setData, (e) => Alert.alert(e));
  }, []);

  const renderItem = ({ section, item }) => {
    return (
      <>
        <ForumCard forumData={item} />
      </>
    );
  };

  const renderHeader = () => <></>;

  const renderFooter = () => <></>;

  return (
    <>
      <Text style={styles.text}>List of forums</Text>
      <TextInput onChangeText={(t) => setSearch(t)} style={styles.textInput} />
      <SectionList
        removeClippedSubviews={true}
        sections={[{ data: filteredData }]}
        renderItem={renderItem}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
      />
    </>
  );
};

export default ForumList;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "lightblue",
    margin: 5,
    padding: 5
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    textAlign: "center",
    margin: 10,
    textDecorationLine: "underline"
  },
  textInput: {
    flexGrow: 0,
    flexShrink: 0,
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    backgroundColor: "white",
    color: "black",
    padding: 5,
    borderRadius: 10
  }
});
