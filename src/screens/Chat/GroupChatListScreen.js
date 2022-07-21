import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  ChatListContainer,
  ScrollChatContainer
} from "../../styles/ChatStyles";
import {
  CenteredBoldText,
  IconGroup,
  IconText,
  NotificationIcon,
  SearchInput
} from "../../styles/GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import { chatType } from "../../constants/Chat";
import {
  fetchActiveGroupChats,
  checkUnreadPrivateMessages
} from "../../services/Chat/FetchActiveChats";
import ActiveChatLists from "../../components/Chat/ActiveChatLists";
import Loading from "../../components/Miscellaneous/Loading";
import { Icon } from "react-native-elements";

const GroupChatListScreen = () => {
  const [search, setSearch] = useState("");
  const [activeChats, setActiveChats] = useState([]);
  const [isUnreadExists, setIsUnreadExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  function navigateToGroupsList() {
    navigation.navigate("Friends", { screen: "GroupList", initial: false });
  }

  function navigateToPrivateChat() {
    navigation.push("ChatList");
  }

  useEffect(() => {
    setIsLoading(true);

    return fetchActiveGroupChats({
      onSuccess: (data) => {
        setActiveChats(data);
        setIsLoading(false);
      },
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  useEffect(() => {
    return checkUnreadPrivateMessages({
      onFound: () => setIsUnreadExists(true),
      onNotFound: () => setIsUnreadExists(false),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  const filteredChats = activeChats.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase())
  );

  const ChatLists = () => {
    return (
      <ChatListContainer>
        {filteredChats.map((item, index) => (
          <ActiveChatLists
            key={index}
            type={chatType.GROUP_CHAT}
            item={item}
            navigation={navigation}
          />
        ))}
      </ChatListContainer>
    );
  };

  return (
    <Loading isLoading={isLoading}>
      <ScrollChatContainer>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search messages"
          testID="searchBar"
        />

        <CenteredBoldText underline testID="title">
          Group Chat List
        </CenteredBoldText>

        <IconGroup>
          <View>
            <Icon
              type="material-community"
              name="account-group"
              color="navy"
              size={30}
              onPress={navigateToGroupsList}
              testID="groupListButton"
            />
            <IconText>Message Other Groups</IconText>
          </View>
          <View>
            <NotificationIcon isVisible={isUnreadExists}>
              <Icon
                type="ionicon"
                name="md-chatbubble-ellipses"
                color="navy"
                size={30}
                onPress={navigateToPrivateChat}
                testID="privateChatButton"
              />
            </NotificationIcon>
            <IconText>Private Chat List</IconText>
          </View>
        </IconGroup>

        <ChatLists />
      </ScrollChatContainer>
    </Loading>
  );
};

export default GroupChatListScreen;
