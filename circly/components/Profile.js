import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

const Profile = ({ item, userId, setProfiles }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async (selectedUserId) => {
    try {
      setLiked(true);
      await axios.post("http://192.168.0.33:3000/send-like", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== selectedUserId)
        );
        setLiked(false);
      }, 200);
    } catch (error) {
      console.log("error liking", error);
    }
  };

  return (
    <Animatable.View animation="fadeInUp" style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.profileImage} source={{ uri: item?.profileImages[0] }} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.nameAndIcon}>
          <Text style={styles.nameText}>{item?.name}</Text>
          <Pressable onPress={() => handleLike(item?._id)} style={styles.iconButton}>
            {liked ? (
              <Animatable.View
                animation="swing"
                easing={"ease-in-out-circ"}
                iterationCount={1}
              >
                <AntDesign name="heart" size={27} color="white" />
              </Animatable.View>
            ) : (
              <AntDesign name="hearto" size={27} color="white" />
            )}
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.descriptionScroll}>
          <Text style={styles.descriptionText}>
            {item?.description}
          </Text>
        </ScrollView>
      </View>
    </Animatable.View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: "#fff",
    width: width * 0.95,  // add padding on sides
    height: height * 0.85,  // ensure it fits well within the screen
    alignSelf: "center",
  },
  imageContainer: {
    height: height * 0.6,
    width: '100%',
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  nameAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  descriptionScroll: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 15,
    color: "#fff",
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,  // Added to separate the heart icon from the name text
  },
});
