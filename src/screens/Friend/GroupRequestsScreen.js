import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  BoldText,
  Button,
  ButtonText,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import { fetchGroupInvitation } from "../../services/Friend/FetchGroup";
import { groupListType } from "../../constants/Group";
import RenderGroupLists from "../../components/Friend/RenderGroupLists";
import Loading from "../../components/Miscellaneous/Loading";

const GroupRequestsScreen = ({ navigation }) => {
  const [groupRequests, setGroupRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    return fetchGroupInvitation({
      onSuccess: (data) => {
        setGroupRequests(data);
        setIsLoading(false);
      },
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
    <Loading isLoading={isLoading}>
      <ScrollContainer>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search group requests"
        />

        <BoldText underline>Group Requests List</BoldText>

        <Button onPress={() => navigation.replace("GroupList")}>
          <ButtonText>Go Back</ButtonText>
        </Button>

        <GroupContactLists />
      </ScrollContainer>
    </Loading>
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
