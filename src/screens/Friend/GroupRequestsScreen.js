import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  BoldText,
  Button,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { fetchGroupInvitation } from "../../services/Friend/FetchGroup";
import { groupListType } from "../../constants/Group";
import RenderGroupLists from "../../components/Friend/RenderGroupLists";

const GroupRequestsScreen = ({ navigation }) => {
  const [groupRequests, setGroupRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    return fetchGroupInvitation({
      onSuccess: setGroupRequests,
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  const filteredRequests = groupRequests.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase())
  );

  const GroupContactLists = () => (
    <View style={styles.listContainer}>
      {filteredRequests.map((item, index) => (
        <RenderGroupLists
          key={index}
          type={groupListType.GROUP_INVITATION}
          item={item}
          navigation={navigation}
        />
      ))}
    </View>
  );

  return (
    <ScrollContainer>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search group requests"
        testID="searchBar"
      />

      <BoldText underline testID="title">
        Group Requests List
      </BoldText>

      <Button onPress={() => navigation.replace("GroupList")} testID="goBack">
        <Text>Go Back</Text>
      </Button>

      <GroupContactLists />
    </ScrollContainer>
  );
};

export default GroupRequestsScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    padding: 5
  }
});
