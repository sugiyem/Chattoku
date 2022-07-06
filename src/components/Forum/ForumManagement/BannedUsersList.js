import { useEffect, useState } from "react";
import { ScrollView, SectionList, Text } from "react-native";
import BannedUser from "./BannedUser";
import { getBannedUsers } from "../../../services/Forum/HandleBannedUsers";

const BannedUsersList = ({ forumId, isAuthorized }) => {
  const [users, setUsers] = useState([]);
  console.log(users.length);

  useEffect(() => {
    return getBannedUsers(forumId, setUsers);
  }, []);

  const renderItem = ({ item }) => {
    return <BannedUser {...item} isAuthorized={isAuthorized} />;
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
      keyExtractor={(item) => item.userId}
      renderItem={renderItem}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
    />
  );
};

export default BannedUsersList;
