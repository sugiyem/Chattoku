import { Alert, SectionList, Text } from "react-native";
import FetchForumData from "./FetchForumData";
import { firebase } from "../../firebase/Config";
import ForumCard from "./ForumCard";
import { useState, useEffect } from "react";
import { Header } from "react-native-elements";

const initialData = [
  {
    data: []
  }
];

const ForumList = () => {
  const [data, setData] = useState(initialData);

  console.log(data);

  useEffect(() => {
    console.log("useEffect triggered");
    return FetchForumData(
      (documents) => setData([{ data: documents }]),
      (e) => console.error(e)
    );
  }, []);

  const renderItem = ({ section, item }) => {
    return (
      <>
        <ForumCard {...item} />
      </>
    );
  };

  const renderHeader = () => <></>;

  const renderFooter = () => <></>;

  return (
    <>
      <Header centerComponent={<Text>List Of Forums</Text>} />
      <SectionList
        removeClippedSubviews={true}
        sections={data}
        renderItem={renderItem}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
      />
    </>
  );
};

export default ForumList;
