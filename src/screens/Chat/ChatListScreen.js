import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  ChatListContainer,
  ScrollChatContainer
} from "../../styles/ChatStyles";
import {
  BoldText,
  ButtonGroup,
  ButtonText,
  SearchInput,
  SeparatedButton
} from "../../styles/GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import { chatType } from "../../constants/Chat";
import {
  fetchActivePrivateChats,
  checkUnreadGroupMessages
} from "../../services/Chat/FetchActiveChats";
import ActiveChatLists from "../../components/Chat/ActiveChatLists";
import NotificationText from "../../components/Miscellaneous/NotificationText";

const ChatListScreen = () => {
  const [search, setSearch] = useState("");
  const [activeChats, setActiveChats] = useState([]);
  const [isUnreadExists, setIsUnreadExists] = useState(false);
  const navigation = useNavigation();

  function navigateToAddChat() {
    navigation.navigate("AddChat");
  }

  function navigateToGroupChat() {
    navigation.push("GroupChatList");
  }

  useEffect(() => {
    return fetchActivePrivateChats({
      onSuccess: setActiveChats,
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

      <ButtonGroup>
        <SeparatedButton onPress={navigateToAddChat} testID="addChatButton">
          <ButtonText color="#000000">Message other users</ButtonText>
        </SeparatedButton>

        <SeparatedButton onPress={navigateToGroupChat} testID="groupChatButton">
          <NotificationText text="Group Chat List" isShown={isUnreadExists} />
        </SeparatedButton>
      </ButtonGroup>

      <ChatLists />
    </ScrollChatContainer>
  );
};

export default ChatListScreen;
