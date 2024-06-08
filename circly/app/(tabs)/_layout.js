import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.2,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarShowLabel: false, // Emoji altında yazıyı kaldırır
      })}
    >
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="eye" size={24} color="black" />
            ) : (
              <Feather name="eye" size={24} color="gray" />
            ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="black"
              />
            ) : (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="gray"
              />
            ),
        }}
      />

      <Tabs.Screen
        name="bio"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="person-outline" size={24} color="black" />
            ) : (
              <MaterialIcons name="person-outline" size={24} color="gray" />
            ),
        }}
      />
    </Tabs>
  );
}
