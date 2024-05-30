import React, { useState,useEffect } from "react";
import { Text, View, Image, StyleSheet, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const register = () => {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_900Black,
      });

    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try{
                const token = await AsyncStorage.getItem("auth");
                if(token){
                    router.replace("/(tabs)/profile")
                }
            } catch(error){
                console.log("Error",error)
            }
        }
        checkLoginStatus()
      },[])
      const handleRegister = () => {
        const user = {
          name: name,
          email: email,
          password: password,
        };
    
        // send a POST  request to the backend API to register the user
        axios
          .post("http://192.168.0.33:3000/register", user)
          .then((response) => {
            console.log(response);
            Alert.alert(
              "Registration successful",
              "You have been registered Successfully"
            );
            setName("");
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            Alert.alert(
              "Registration Error",
              "An error occurred while registering"
            );
            console.log("registration failed", error);
          });
      };

      if (!fontsLoaded) {
        return null;
      }
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
    <View style={{ height: 200, backgroundColor: 'pink', width: '100%' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
        <Image
          style={{ width: 150, height: 80, resizeMode: 'contain' }}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/6655/6655045.png',
          }}
        />
      </View>
      <Text
        style={{
          marginTop: 20,
          textAlign: 'center',
          fontSize: 20,
          fontFamily: 'Roboto_900Black',
        }}
      >
        CİRCLY
      </Text>
    </View>
    
    <KeyboardAvoidingView>
      <View style={{ alignItems: "center" }}>
          <Text  style={{fontSize: 17,fontFamily: "Roboto_900Black",marginTop: 25,color: "#F9629F"}}> Register to your Account</Text>
      </View>

      <View  style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}>
          <Image
          style={{ width: 100, height: 80, resizeMode: "cover" }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/2509/2509078.png",
          }}
        />
      </View> 

      <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#FFC0CB",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <Ionicons
            style={{ marginLeft: 8 }}
            name="person-sharp"
            size={24}
            color="white"
          />
           <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter your name"
            placeholderTextColor={"white"}
            style={{
              color: "white",
              marginVertical: 10,
              width: 300,
              fontSize: name ? 17 : 17,
            }}
          />
        </View>

      <View  style={{}}>
      <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#FFC0CB",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <MaterialIcons
            style={{ marginLeft: 8 }}
            name="email"
            size={24}
            color="white"
          />
           <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            placeholderTextColor={"white"}
            style={{
              color: "white",
              marginVertical: 10,
              width: 300,
              fontSize: password ? 17 : 17,
            }}
          />
        </View>
        

        

        <View style={{}}>
        <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#FFC0CB",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
              <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="white"
            />
            <TextInput
             value={password}
             onChangeText={(text) => setPassword(text)}
              placeholder="Enter your password"
              secureTextEntry={true}
              style={{
                color: "white",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 17 : 17,
              }}
              placeholderTextColor="white"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
           
        </View>

      <View style={{ marginTop: 50 }} />

        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#FFC0CB",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/login")}
          style={{ marginTop: 12 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          Already have an account? Sign In
          </Text>
        </Pressable>
      </View>

    </KeyboardAvoidingView>


  </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({})