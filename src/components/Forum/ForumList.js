import {
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import ForumCard from "./ForumCard";
import { useState } from "react";
import { SearchInput } from "../../styles/GeneralStyles";
import { ForumSearchBar } from "../../styles/ForumStyles";

const ForumList = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((forum) =>
    forum.title.toLowerCase().includes(search.toLowerCase())
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
      <ForumSearchBar
        onChangeText={(t) => setSearch(t)}
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
