import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";

const UserChat = ({ item, userId }) => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  const getLastMessage = () => {
    const n = messages.length;
    return messages[n - 1];
  };

  const lastMessage = getLastMessage();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = item?._id;
      const response = await axios.get("http://192.168.0.33:3000/messages", {
        params: { senderId, receiverId },
      });

      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/chat/chatroom",
          params: {
            image: item?.profileImages[0],
            name: item?.name,
            receiverId: item?._id,
            senderId: userId,
          },
        })
      }
      style={styles.container}
    >
      <View>
        <Image
          style={styles.profileImage}
          source={{ uri: item?.profileImages[0] }}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item?.name}</Text>
        <Text style={styles.messageText}>
          {lastMessage ? lastMessage?.message : `Start Chat with ${item?.name}`}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 12,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  messageText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
