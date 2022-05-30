import { useEffect, useState } from "react";
import { Alert, SectionList } from "react-native";
import FetchPost from "./FetchPost";
import PostCard from "./PostCard";

const PostList = ({ forumId }) => {
  const [posts, setPosts] = useState([]);

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
    return <PostCard {...item} forumId={forumId} />;
  };

  const renderHeader = () => <></>;

  const renderFooter = () => <></>;

  return (
    <>
      <SectionList
        removeClippedSubviews={true}
        sections={[{ data: posts }]}
        renderItem={renderItem}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
      />
    </>
  );
};

export default PostList;
