import { useEffect, useState } from "react";
import { Alert, SectionList } from "react-native";
import FetchComment from "../../../services/Forum/FetchComment";
import CommentCard from "./CommentCard";
import { isAuthorizedToDeletePosts } from "../../../services/Forum/HandleForumAdmin";

const CommentList = ({ forumId, postId, Header = () => <></> }) => {
  const [comments, setComments] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    return FetchComment(
      forumId,
      postId,
      (data) => {
        data.sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1));
        setComments(data);
      },
      (error) => Alert.alert(error)
    );
  }, []);

  useEffect(() => {
    return isAuthorizedToDeletePosts(forumId, setIsAuthorized);
  }, []);

  const renderItem = ({ section, item }) => {
    console.log(item);
    return (
      <CommentCard
        {...item}
        forumId={forumId}
        postId={postId}
        isAuthorized={isAuthorized}
      />
    );
  };

  const renderFooter = () => <></>;

  return (
    <>
      <SectionList
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
