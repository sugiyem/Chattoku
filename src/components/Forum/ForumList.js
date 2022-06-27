import {
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import ForumCard from "./ForumCard";
import { useState } from "react";

const ForumList = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((forum) =>
    forum.title.toLowerCase().startsWith(search.toLowerCase())
  );

  // console.log(data);

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
      <TextInput
        onChangeText={(t) => setSearch(t)}
        style={styles.textInput}
        placeholder="Search Forum By Name..."
      />
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
