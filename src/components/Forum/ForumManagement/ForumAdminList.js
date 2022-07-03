import { useEffect, useState } from "react";
import { SectionList } from "react-native";
import { getAllAdmins } from "../../../services/Forum/HandleForumAdmin";
import ForumAdminCard from "./ForumAdminCard";

const ForumAdminList = ({ forumId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    return getAllAdmins(forumId, setUsers);
  }, []);

  const renderItem = ({ item }) => {
    return <ForumAdminCard userId={item.uid} authorities={item.authorities} />;
  };

  const renderHeader = () => <></>;

  const renderFooter = () => <></>;

  return (
    <SectionList
      removeClippedSubviews={true}
      sections={[
        {
          data: users
        }
      ]}
      keyExtractor={(item) => item.uid}
      renderItem={renderItem}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
    />
  );
};

export default ForumAdminList;
