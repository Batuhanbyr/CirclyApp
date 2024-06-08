import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

const chatroom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const socket = io("http://192.168.0.33:8000");

  socket.on("connect", () => {
    console.log("Connected to the Socket.IO server");
  });
  socket.on("receiveMessage", (newMessage) => {
    console.log("new Message", newMessage);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  });

  const sendMessage = async (senderId, receiverId) => {
    socket.emit("sendMessage", { senderId, receiverId, message });

    setMessage("");

    setTimeout(() => {
      fetchMessages();
    }, 200);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
          <View style={styles.headerLeftInfo}>
            <Image
              style={styles.headerImage}
              source={{ uri: params?.image }}
            />
            <Text style={styles.headerName}>{params?.name}</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
          <Ionicons name="videocam-outline" size={24} color="black" />
        </View>
      ),
      headerStyle: {
        backgroundColor: "#fff",
      },
    });
  }, []);

  const fetchMessages = async () => {
    try {
      const senderId = params?.senderId;
      const receiverId = params?.receiverId;

      const response = await axios.get("http://192.168.0.33:3000/messages", {
        params: { senderId, receiverId },
      });

      setMessages(response.data);
    } catch (error) {
      console.log("Error fetching the messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const openEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {messages?.map((item, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index * 100}
            style={[
              item?.senderId === params?.senderId
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item?.message}</Text>
            <Text style={styles.timestamp}>{formatTime(item?.timestamp)}</Text>
          </Animatable.View>
        ))}
      </ScrollView>

      {showEmojiPicker && (
        <View style={styles.emojiPickerWrapper}>
          <EmojiSelector
            onEmojiSelected={handleEmojiSelect}
            showSearchBar={false}
            showSectionTitles={false}
            category={Categories.all}
            columns={8}
            style={styles.emojiSelector}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Pressable onPress={openEmojiPicker}>
          <Entypo style={styles.icon} name="emoji-happy" size={24} color="gray" />
        </Pressable>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#ddd"
        />

        <Pressable
          onPress={() => sendMessage(params?.senderId, params?.receiverId)}
          style={styles.sendButton}
        >
          <Ionicons name="send" size={24} color="white" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default chatroom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerLeftInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "cover",
  },
  headerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcdcdc",
    padding: 8,
    maxWidth: "60%",
    borderRadius: 7,
    margin: 10,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    padding: 8,
    margin: 10,
    borderRadius: 7,
    maxWidth: "60%",
  },
  messageText: {
    fontSize: 13,
    textAlign: "left",
    color: "black",
    fontWeight: "500",
  },
  timestamp: {
    fontSize: 9,
    textAlign: "right",
    color: "#666",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  icon: {
    marginRight: 7,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "black",
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  emojiPickerWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    height: 250,
    backgroundColor: "#fff",
    zIndex: 1000, // Emoji seçici diğer bileşenlerin üstünde olacak şekilde
  },
  emojiSelector: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
