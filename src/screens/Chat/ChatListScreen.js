import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  ChatListContainer,
  ScrollChatContainer
} from "../../styles/ChatStyles";
import {
  BoldText,
  IconGroup,
  IconText,
  NotificationIcon,
  SearchInput
} from "../../styles/GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import { chatType } from "../../constants/Chat";
import {
  fetchActivePrivateChats,
  checkUnreadGroupMessages
} from "../../services/Chat/FetchActiveChats";
import ActiveChatLists from "../../components/Chat/ActiveChatLists";
import Loading from "../../components/Miscellaneous/Loading";
import { Icon } from "react-native-elements";

const ChatListScreen = () => {
  const [search, setSearch] = useState("");
  const [activeChats, setActiveChats] = useState([]);
  const [isUnreadExists, setIsUnreadExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  function navigateToAddChat() {
    navigation.navigate("AddChat");
  }

  function navigateToGroupChat() {
    navigation.push("GroupChatList");
  }

  useEffect(() => {
    setIsLoading(true);

    return fetchActivePrivateChats({
      onSuccess: (data) => {
        setActiveChats(data);
        setIsLoading(false);
      },
      onFailure: (error) => Alert.alert(error.message)
    });
  }, []);

  useEffect(() => {
    return checkUnreadGroupMessages({
      onFound: () => setIsUnreadExists(true),
      onNotFound: () => setIsUnreadExists(false),
      onFailure: (error) => Alert.alert("Error", error.message)
    });
  }, []);

  const filteredChats = activeChats.filter((item) =>
    item.username.toLowerCase().startsWith(search.toLowerCase())
  );

  const ChatLists = () => {
    return (
      <ChatListContainer>
        {filteredChats.map((item, index) => (
          <ActiveChatLists
            key={index}
            type={chatType.PRIVATE_CHAT}
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

        <BoldText underline testID="title">
          Private Chat List
        </BoldText>

        <IconGroup>
          <View>
            <Icon
              type="material-community"
              name="chat-plus"
              color="navy"
              size={30}
              onPress={navigateToAddChat}
              testID="addChatButton"
            />
            <IconText>New Message</IconText>
          </View>
          <View>
            <NotificationIcon isVisible={isUnreadExists}>
              <Icon
                type="ionicon"
                name="md-chatbubbles"
                color="navy"
                size={30}
                onPress={navigateToGroupChat}
                testID="groupChatButton"
              />
            </NotificationIcon>
            <IconText>Group Chat List</IconText>
          </View>
        </IconGroup>

        <ChatLists />
      </ScrollChatContainer>
    </Loading>
  );
};

export default ChatListScreen;
