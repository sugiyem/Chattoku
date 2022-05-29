import { useEffect, useState } from "react";
import { SectionList } from "react-native";
import FetchComment from "./FetchComment";
import CommentCard from "./CommentCard";

const CommentList = ({ forumId, postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    FetchComment(
      forumId,
      postId,
      (data) => setComments(data),
      () => {}
    );
  }, []);

  const renderItem = ({ section, item }) => {
    console.log(item);
    return (
      <CommentCard
        {...item}
        forumId={forumId}
        postId={postId}
        setComments={setComments}
      />
    );
  };

  const renderHeader = () => <></>;

  const renderFooter = () => <></>;

  return (
    <>
      <SectionList
        removeClippedSubviews={true}
        sections={[{ data: comments }]}
        renderItem={renderItem}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
      />
    </>
  );
};

export default CommentList;
