import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Pressable, Alert, FlatList } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "core-js/stable/atob";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Profile from "../../../components/Profile";

const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(`http://192.168.0.33:3000/users/${userId}`);
      console.log(response);
      const user = response.data;
      setUser(user?.user);
    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://192.168.0.33:3000/profiles", {
        params: {
          userId: userId,
          gender: user?.gender,
          turnOns: user?.turnOns,
          lookingFor: user?.lookingFor,
        },
      });

      setProfiles(response.data.profiles);
    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && user) {
      fetchProfiles();
    }
  }, [userId, user]);

  console.log("profiles", profiles);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Profile
            key={index}
            item={item}
            userId={userId}
            setProfiles={setProfiles}
            isEven={index % 2 === 0}
          />
        )}
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})