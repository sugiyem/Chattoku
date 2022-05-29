import { useEffect, useState } from "react";
import { SectionList } from "react-native";
import FetchPost from "./FetchPost";
import PostCard from "./PostCard";

const PostList = ({ forumId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    FetchPost(
      forumId,
      (data) => setPosts(data),
      () => {}
    );
  }, []);

  //
  console.log("POST LIST");
  console.log(posts);

  const renderItem = ({ section, item }) => {
    return <PostCard {...item} forumId={forumId} setPosts={setPosts} />;
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
