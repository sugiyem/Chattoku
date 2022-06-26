import { SectionList } from "react-native";
import PastPostCard from "./PastPostCard";

const PastPostList = ({ postsData, Header }) => {
  const renderItem = ({ item }) => {
    return <PastPostCard {...item} />;
  };

  return (
    <SectionList
      sections={[{ data: postsData }]}
      renderItem={renderItem}
      renderSectionHeader={Header}
    />
  );
};

export default PastPostList;
