import { useEffect, useState } from "react";
import { ScrollView, SectionList, Text } from "react-native";
import { View } from "react-native-web";
import BannedUser from "./BannedUser";
import { getBannedUsers } from "./HandleBannedUsers";

const BannedUsersList = ({ forumId }) => {
  const [users, setUsers] = useState([]);
  console.log(users.length);

  useEffect(() => {
    getBannedUsers(forumId, setUsers);
  }, []);

  const renderItem = ({ item }) => {
    return <BannedUser {...item} />;
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
      renderItem={renderItem}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
    />
  );
};

export default BannedUsersList;
