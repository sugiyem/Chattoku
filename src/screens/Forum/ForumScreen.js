import { Alert, StyleSheet, Text } from "react-native";
import ForumCard from "../../components/Forum/ForumCard";
import FetchForumData from "../../components/Forum/FetchForumData";
import ForumList from "../../components/Forum/ForumList";
import { useEffect } from "react";

const ForumScreen = () => {
  return <ForumList />;
};

export default ForumScreen;

const styles = StyleSheet.create();
