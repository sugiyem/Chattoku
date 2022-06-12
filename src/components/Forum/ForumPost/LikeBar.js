import { StyleSheet } from "react-native";
import { Icon, Text, View } from "react-native-elements";
import { likeStatus } from "../../../constants/Post";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import {
  updateLikes,
  getNumberOfLikes,
  getLikeStatus
} from "./HandleForumPost";

const LikeBar = ({ postId, forumId }) => {
  const [postLikeStatus, setPostLikeStatus] = useState(likeStatus.NEUTRAL);
  const [likeCount, setLikeCount] = useState(0);
  const isLiked = postLikeStatus === likeStatus.LIKE;
  const isDisliked = postLikeStatus === likeStatus.DISLIKE;
  const thumbsUpColor = isLiked ? "blue" : "black";
  const thumbsDownColor = isDisliked ? "red" : "black";

  const debouncedUpdateLikes = useCallback(debounce(updateLikes, 2000), []);

  useEffect(() => {
    getNumberOfLikes(forumId, postId, setLikeCount);
    getLikeStatus(forumId, postId, setPostLikeStatus);
  }, []);

  function handleLikeButtonClick() {
    if (postLikeStatus === likeStatus.LIKE) {
      setPostLikeStatus(likeStatus.NEUTRAL);
      debouncedUpdateLikes(forumId, postId, likeStatus.NEUTRAL);
      setLikeCount(likeCount - 1);
    } else if (postLikeStatus === likeStatus.DISLIKE) {
      setPostLikeStatus(likeStatus.LIKE);
      debouncedUpdateLikes(forumId, postId, likeStatus.LIKE);
      setLikeCount(likeCount + 2);
    } else {
      setPostLikeStatus(likeStatus.LIKE);
      debouncedUpdateLikes(forumId, postId, likeStatus.LIKE);
      setLikeCount(likeCount + 1);
    }
  }

  function handleDislikeButtonClick() {
    if (postLikeStatus === likeStatus.DISLIKE) {
      setPostLikeStatus(likeStatus.NEUTRAL);
      debouncedUpdateLikes(forumId, postId, likeStatus.NEUTRAL);
      setLikeCount(likeCount + 1);
    } else if (postLikeStatus === likeStatus.LIKE) {
      setPostLikeStatus(likeStatus.DISLIKE);
      debouncedUpdateLikes(forumId, postId, likeStatus.DISLIKE);
      setLikeCount(likeCount - 2);
    } else {
      setPostLikeStatus(likeStatus.DISLIKE);
      debouncedUpdateLikes(forumId, postId, likeStatus.DISLIKE);
      setLikeCount(likeCount - 1);
    }
  }

  return (
    <>
      <Icon
        name="thumb-up"
        type="material"
        color={thumbsUpColor}
        onPress={handleLikeButtonClick}
      />
      <Text>{likeCount}</Text>
      <Icon
        name="thumb-down"
        type="material"
        color={thumbsDownColor}
        onPress={handleDislikeButtonClick}
      />
    </>
  );
};

export default LikeBar;

const styles = StyleSheet.create({});
