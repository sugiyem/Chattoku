import { useEffect, useState } from "react";
import { Alert, SectionList } from "react-native";
import FetchComment from "../../../services/Forum/FetchComment";
import CommentCard from "./CommentCard";

const CommentList = ({ forumId, postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    return FetchComment(
      forumId,
      postId,
      (data) => setComments(data),
      (error) => Alert.alert(error)
    );
  }, []);

  const renderItem = ({ section, item }) => {
    console.log(item);
    return <CommentCard {...item} forumId={forumId} postId={postId} />;
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
