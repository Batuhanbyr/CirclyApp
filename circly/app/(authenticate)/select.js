import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Pressable, Alert } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "core-js/stable/atob";
import { jwtDecode, JwtPayload } from 'jwt-decode';

const Select = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  const [option, setOption] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('auth');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const updateUserGender = async () => {
    try {
      const token = await AsyncStorage.getItem('auth');
      const response = await axios.put(`http://192.168.0.33:3000/users/${userId}/gender`, {
        gender: option,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.status === 200) {
        router.replace('(tabs)/bio');
      }
    } catch (error) {
      console.log('Error updating gender:', error);
      Alert.alert('Error', 'Failed to update gender. Please try again.');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 12 }}>
      <Pressable
        onPress={() => setOption('male')}
        style={{
          backgroundColor: '#F0F0F0',
          padding: 12,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 25,
          borderRadius: 5,
          borderColor: option === 'male' ? '#D0D0D0' : 'transparent',
          borderWidth: option === 'male' ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: 'Roboto_900Black' }}>I am a Man</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: 'https://img.icons8.com/?size=100&id=7702&format=png&color=000000',
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => setOption('female')}
        style={{
          backgroundColor: '#F0F0F0',
          padding: 12,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 25,
          borderRadius: 5,
          borderColor: option === 'female' ? '#D0D0D0' : 'transparent',
          borderWidth: option === 'female' ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: 'Roboto_900Black' }}>I am a Woman</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: 'https://img.icons8.com/?size=100&id=7696&format=png&color=000000',
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => setOption('other')}
        style={{
          backgroundColor: '#F0F0F0',
          padding: 12,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 25,
          borderRadius: 5,
          borderColor: option === 'nonbinary' ? '#D0D0D0' : 'transparent',
          borderWidth: option === 'nonbinary' ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: 'Roboto_900Black' }}>I am Non-Binary</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: 'https://img.icons8.com/?size=100&id=ZdUN3j3NnuUW&format=png&color=000000',
          }}
        />
      </Pressable>
      {option && (
        <Pressable
          onPress={updateUserGender}
          style={{
            marginTop: 25,
            backgroundColor: 'black',
            padding: 12,
            borderRadius: 4,
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Done</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default Select;

const styles = StyleSheet.create({});