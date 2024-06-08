import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");
        if (token) {
          router.replace("/(tabs)/profile");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios.post("http://192.168.0.33:3000/login", user).then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("auth", token);
      router.replace("/(authenticate)/select");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Text style={styles.title}>CİRCLY</Text>
      </Animatable.View>

      <KeyboardAvoidingView>
        <Animatable.View animation="fadeInUp" delay={300} style={styles.centerAlign}>
          <Text style={styles.loginTitle}>Log in to your Account</Text>
        </Animatable.View>

        <View style={styles.inputContainer}>
          <Animatable.View animation="fadeInUp" delay={600} style={styles.inputWrapper}>
            <MaterialIcons
              style={styles.icon}
              name="email"
              size={24}
              color="black"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={"gray"}
              style={styles.input}
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={900} style={styles.inputWrapper}>
            <AntDesign
              style={styles.icon}
              name="lock1"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter your password"
              style={styles.input}
              placeholderTextColor="gray"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={1200} style={styles.keepMeLoggedInContainer}>
            <Text>Keep me logged in</Text>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={1500}>
            <Pressable onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={1800}>
            <Pressable
              onPress={() => router.replace("/register")}
              style={styles.signUpLink}
            >
              <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </Pressable>
          </Animatable.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    height: 200,
    width: "100%",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  centerAlign: {
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    color: "#333",
  },
  inputContainer: {
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 300,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: "black",
    marginVertical: 10,
    width: 250,
    fontSize: 17,
  },
  keepMeLoggedInContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
  },
  forgotPasswordText: {
    color: "#007FFF",
    fontWeight: "500",
  },
  loginButton: {
    width: 200,
    backgroundColor: "#333",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    marginTop: 30,
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpLink: {
    marginTop: 20,
  },
  signUpText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});
