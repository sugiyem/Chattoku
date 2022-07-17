import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  BoldText,
  IconGroup,
  IconText,
  NotificationIcon,
  ScrollContainer,
  SearchInput
} from "../../styles/GeneralStyles";
import {
  fetchGroup,
  checkGroupInvitation
} from "../../services/Friend/FetchGroup";
import { groupListType } from "../../constants/Group";
import RenderGroupLists from "../../components/Friend/RenderGroupLists";
import { Icon } from "react-native-elements";

const GroupListScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [isInvitationExist, setIsInvitationExist] = useState(false);

  useEffect(() => {
    return fetchGroup({
      onSuccess: setGroups,
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return checkGroupInvitation({
      onFound: () => {
        setIsInvitationExist(true);
      },
      onNotFound: () => {
        setIsInvitationExist(false);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  const filteredGroups = groups.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase())
  );

  const GroupContactLists = () => (
    <View style={styles.listContainer}>
      {filteredGroups.map((item, index) => (
        <RenderGroupLists
          key={index}
          type={groupListType.GROUP}
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
        onChangeText={(text) => setSearch(text)}
        placeholder="Search group by name"
      />

      <BoldText underline>Groups List</BoldText>

      <IconGroup>
        <View>
          <Icon
            type="material-community"
            name="account-multiple"
            color="navy"
            size={30}
            onPress={() => navigation.replace("FriendList")}
          />
          <IconText>Friends</IconText>
        </View>
        <View>
          <Icon
            type="material-community"
            name="account-multiple-plus"
            color="navy"
            size={30}
            onPress={() => navigation.navigate("GroupCreation")}
          />
          <IconText>Add Group</IconText>
        </View>
        <View>
          <NotificationIcon isVisible={isInvitationExist}>
            <Icon
              type="material-community"
              name="account-multiple-check"
              color="navy"
              size={30}
              onPress={() => navigation.navigate("GroupRequests")}
            />
          </NotificationIcon>
          <IconText>Invitation</IconText>
        </View>
      </IconGroup>

      <GroupContactLists />
    </ScrollContainer>
  );
};

export default GroupListScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    padding: 5
  }
});
