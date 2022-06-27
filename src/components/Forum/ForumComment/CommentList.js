import { useEffect, useState } from "react";
import { Alert, SectionList } from "react-native";
import FetchComment from "../../../services/Forum/FetchComment";
import CommentCard from "./CommentCard";

const CommentList = ({ forumId, postId, Header = () => <></> }) => {
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

  const renderFooter = () => <></>;

  return (
    <>
      <SectionList
        key={comments}
        removeClippedSubviews={true}
        sections={[{ data: comments }]}
        renderItem={renderItem}
        renderSectionHeader={Header}
        renderFooter={renderFooter}
      />
    </>
  );
};

export default CommentList;
