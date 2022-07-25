import { useEffect, useState } from "react";
import { Alert, SectionList } from "react-native";
import FetchComment from "../../../services/Forum/FetchComment";
import CommentCard from "./CommentCard";
import { isAuthorizedToDeletePosts } from "../../../services/Forum/HandleForumAdmin";
import Loading from "../../Miscellaneous/Loading";

const CommentList = ({ forumId, postId, Header = () => <></> }) => {
  const [comments, setComments] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isAuthorizedLoading, setIsAuthorizedLoading] = useState(false);

  useEffect(() => {
    setIsCommentLoading(true);
    return FetchComment(
      forumId,
      postId,
      (data) => {
        data.sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1));
        setComments(data);
        setIsCommentLoading(false);
      },
      (error) => Alert.alert(error)
    );
  }, []);

  useEffect(() => {
    setIsAuthorizedLoading(true);
    return isAuthorizedToDeletePosts(forumId, (status) => {
      setIsAuthorized(status);
      setIsAuthorizedLoading(false);
    });
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
    <Loading isLoading={isCommentLoading || isAuthorizedLoading}>
      <>
        <SectionList
          removeClippedSubviews={true}
          sections={[{ data: comments }]}
          renderItem={renderItem}
          renderSectionHeader={Header}
          renderFooter={renderFooter}
          style={{ alignSelf: "stretch" }}
        />
      </>
    </Loading>
  );
};

export default CommentList;
