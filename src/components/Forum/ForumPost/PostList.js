import { useEffect, useState } from "react";
import { Alert, SectionList, StyleSheet, TextInput } from "react-native";
import { isAuthorizedToDeletePosts } from "../../../services/Forum/HandleForumAdmin";
import PostCard from "./PostCard";

const PostList = ({
  forumId,
  isOwner,
  isBanned,
  Header = () => <></>,
  posts
}) => {
  const [search, setSearch] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const filteredPost = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    return isAuthorizedToDeletePosts(forumId, setIsAuthorized);
  }, []);

  // console.log("POST LIST");
  // console.log(posts);

  const renderItem = ({ section, item }) => {
    return (
      <PostCard
        postData={item}
        isOwner={isOwner}
        isBanned={isBanned}
        forumId={forumId}
        isAuthorized={isAuthorized}
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
