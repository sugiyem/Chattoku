import { useEffect, useState } from "react";
import { Alert, SectionList, StyleSheet, TextInput } from "react-native";
import FetchPost from "./FetchPost";
import PostCard from "./PostCard";

const PostList = ({ forumId, isOwner, isBanned }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const filteredPost = posts.filter((post) =>
    post.title.toLowerCase().startsWith(search.toLowerCase())
  );

  useEffect(() => {
    return FetchPost(
      forumId,
      (data) => setPosts(data),
      (error) => Alert.alert(error)
    );
  }, []);

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

  const renderHeader = () => {};

  const renderFooter = () => <></>;

  return (
    <>
      <TextInput
        onChangeText={(t) => setSearch(t)}
        style={styles.textInput}
        placeholder="Search By Title..."
      />
      <SectionList
        removeClippedSubviews={true}
        sections={[
          {
            data: filteredPost
          }
        ]}
        renderItem={renderItem}
        renderHeader={renderHeader}
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
