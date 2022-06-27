import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, SectionList, StyleSheet, TextInput } from "react-native";
import PostCard from "./PostCard";

const PostList = ({
  forumId,
  isOwner,
  isBanned,
  Header = () => <></>,
  posts
}) => {
  const [search, setSearch] = useState("");

  const filteredPost = posts.filter((post) =>
    post.title.toLowerCase().startsWith(search.toLowerCase())
  );

  // console.log("POST LIST");
  // console.log(posts);

  const renderItem = ({ section, item }) => {
    return (
      <PostCard
        {...item}
        isOwner={isOwner}
        isBanned={isBanned}
        forumId={forumId}
      />
    );
  };

  const renderHeader = () => {
    return (
      <>
        <Header />
        <TextInput
          onChangeText={(t) => setSearch(t)}
          style={styles.textInput}
          placeholder="Search By Title..."
        />
      </>
    );
  };

  const renderFooter = () => <></>;

  return (
    <>
      <SectionList
        key={posts}
        removeClippedSubviews={true}
        sections={[
          {
            data: filteredPost
          }
        ]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderHeader}
        renderFooter={renderFooter}
      />
    </>
  );
};

export default PostList;

const styles = StyleSheet.create({
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
