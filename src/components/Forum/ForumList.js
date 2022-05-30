import {
  Alert,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  View
} from "react-native";
import FetchForumData from "./FetchForumData";
import ForumCard from "./ForumCard";
import { useState, useEffect } from "react";

const initialData = [
  {
    data: []
  }
];

const ForumList = () => {
  const [data, setData] = useState(initialData);

  // console.log(data);

  useEffect(() => {
    // console.log("useEffect triggered");
    return FetchForumData(
      (documents) => setData([{ data: documents }]),
      (e) => Alert.alert(e)
    );
  }, []);

  const renderItem = ({ section, item }) => {
    return (
      <>
        <ForumCard {...item} />
      </>
    );
  };

  const renderHeader = () => <></>;

  const renderFooter = () => <></>;

  return (
    <>
      <Text style={styles.text}>List of forums</Text>
      <SectionList
        removeClippedSubviews={true}
        sections={data}
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
  }
});
