import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import axios from "axios";

const select = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const profiles = JSON.parse(params?.profiles);

  const userId = params?.userId;

  const handleMatch = async (selectedUserId) => {
    try {
      await axios.post("http://192.168.0.33:3000/create-match", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        router.push("/chat");
      }, 500);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.headerContainer}>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>Nearby</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>Looking for</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>Interests</Text>
        </View>
      </View>
      {profiles?.length > 0 ? (
        <View style={styles.profilesContainer}>
          {profiles?.map((item, index) => (
            <View style={styles.profileCard} key={index}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <View style={styles.profileContent}>
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{item?.name}</Text>
                    <Text style={styles.profileDescription}>
                      {item?.description?.length > 160
                        ? item?.description
                        : item?.description.substr(0, 160)}
                    </Text>
                  </View>
                  {item?.profileImages?.slice(0, 1).map((image, idx) => (
                    <Image
                      key={idx}
                      style={styles.profileImage}
                      source={{ uri: image }}
                    />
                  ))}
                </View>
              </ScrollView>

              <View style={styles.actionsContainer}>
                <Entypo name="dots-three-vertical" size={26} color="black" />
                <View style={styles.actions}>
                  <Pressable style={styles.actionButton}>
                    <FontAwesome name="diamond" size={27} color="#000" />
                  </Pressable>

                  <Pressable
                    onPress={() => handleMatch(item._id)}
                    style={styles.actionButton}
                  >
                    <AntDesign name="hearto" size={27} color="#000" />
                  </Pressable>
                </View>
              </View>

              <View style={styles.turnOnsContainer}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <View style={styles.tagsContainer}>
                  {item?.turnOns?.map((turnOn, idx) => (
                    <View style={styles.tag} key={idx}>
                      <Text style={styles.tagText}>{turnOn}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.lookingForContainer}>
                <Text style={styles.sectionTitle}>Goals</Text>
                <View style={styles.tagsContainer}>
                  {item?.lookingFor?.map((looking, idx) => (
                    <View style={styles.tag} key={idx}>
                      <Text style={styles.tagText}>{looking}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noFriendsContainer}>
          <Image
            style={styles.noFriendsImage}
            source={{
              uri: "https://img.icons8.com/?size=100&id=78144&format=png&color=000000",
            }}
          />
          <View>
            <Text style={styles.noFriendsText}>
             {" "}
              <Text style={styles.noFriendsHighlightText}>No friends yet</Text>
            </Text>
            <Text style={styles.improveInfoText}>
              Improve your profile information to connect with others
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default select;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  headerItem: {
    backgroundColor: '#dcdcdc',
    padding: 10,
    borderRadius: 18,
  },
  headerText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  profilesContainer: {
    marginTop: 20,
  },
  profileCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    width: '50%',
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  profileDescription: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  profileImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  turnOnsContainer: {
    marginTop: 12,
  },
  lookingForContainer: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
  },
  tagText: {
    color: '#fff',
    fontWeight: '500',
  },
  noFriendsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  noFriendsImage: {
    width: 100,
    height: 100,
  },
  noFriendsText: {
    fontSize: 15,
    textAlign: 'center',
  },
  noFriendsHighlightText: {
    color: '#0000FF',
  },
  improveInfoText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
