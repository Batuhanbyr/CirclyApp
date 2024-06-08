import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from "react-native-animatable";

const Register = () => {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_900Black,
    });

    const [name, setName] = useState("");
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

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };

        // send a POST request to the backend API to register the user
        axios
            .post("http://192.168.0.33:3000/register", user)
            .then((response) => {
                console.log(response);
                Alert.alert(
                    "Registration successful",
                    "You have been registered successfully"
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
        <SafeAreaView style={styles.container}>
            <Animatable.View animation="fadeInDown" style={styles.header}>
                <Text style={styles.title}>CİRCLY</Text>
            </Animatable.View>

            <KeyboardAvoidingView>
                <Animatable.View animation="fadeInUp" delay={300} style={styles.centerAlign}>
                    <Text style={styles.registerTitle}>Register to your Account</Text>
                </Animatable.View>

                <View style={styles.inputContainer}>
                    <Animatable.View animation="fadeInUp" delay={600} style={styles.inputWrapper}>
                        <Ionicons
                            style={styles.icon}
                            name="person-sharp"
                            size={24}
                            color="black"
                        />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder="Enter your name"
                            placeholderTextColor={"gray"}
                            style={styles.input}
                        />
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" delay={900} style={styles.inputWrapper}>
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

                    <Animatable.View animation="fadeInUp" delay={1200} style={styles.inputWrapper}>
                        <AntDesign
                            style={styles.icon}
                            name="lock1"
                            size={24}
                            color="black"
                        />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            style={styles.input}
                            placeholderTextColor="gray"
                        />
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" delay={1500}>
                        <Pressable onPress={handleRegister} style={styles.registerButton}>
                            <Text style={styles.registerButtonText}>Register</Text>
                        </Pressable>
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" delay={1800}>
                        <Pressable onPress={() => router.replace("/login")} style={styles.signInLink}>
                            <Text style={styles.signInText}>Already have an account? Sign In</Text>
                        </Pressable>
                    </Animatable.View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 0,
    },
    header: {
        height: 150,
        width: "100%",
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 0,
    },
    title: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        fontFamily: 'Roboto_900Black',
    },
    centerAlign: {
        alignItems: "center",
    },
    registerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 25,
        color: "#333",
        fontFamily: 'Roboto_900Black',
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
    registerButton: {
        width: 200,
        backgroundColor: "#333",
        borderRadius: 6,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 15,
        marginTop: 30,
    },
    registerButtonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    signInLink: {
        marginTop: 20,
    },
    signInText: {
        textAlign: "center",
        color: "gray",
        fontSize: 16,
    },
});
