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
  fetchActiveGroupChats,
  checkUnreadPrivateMessages
} from "../../services/Chat/FetchActiveChats";
import ActiveChatLists from "../../components/Chat/ActiveChatLists";
import NotificationText from "../../components/Miscellaneous/NotificationText";

const GroupChatListScreen = () => {
  const [search, setSearch] = useState("");
  const [activeChats, setActiveChats] = useState([]);
  const [isUnreadExists, setIsUnreadExists] = useState(false);
  const navigation = useNavigation();

  function navigateToGroupsList() {
    navigation.navigate("Friends", { screen: "GroupList", initial: false });
  }

  function navigateToPrivateChat() {
    navigation.push("ChatList");
  }

  useEffect(() => {
    return fetchActiveGroupChats({
      onSuccess: setActiveChats,
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
    <ScrollChatContainer>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search messages"
      />

      <BoldText underline>Group Chat List</BoldText>

      <ButtonGroup>
        <SeparatedButton onPress={navigateToGroupsList}>
          <ButtonText color="#000000">Message other groups</ButtonText>
        </SeparatedButton>

        <SeparatedButton onPress={navigateToPrivateChat}>
          <NotificationText text="Private Chat List" isShown={isUnreadExists} />
        </SeparatedButton>
      </ButtonGroup>

      <ChatLists />
    </ScrollChatContainer>
  );
};

export default GroupChatListScreen;
