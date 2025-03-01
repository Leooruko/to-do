import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import ProfileTag from "@/components/profileIcon";
import { Ionicons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "What’s Next?",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#333",
            fontFamily: "Candara",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <Ionicons name="checkmark-circle-sharp" />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>{({ pressed }) => <ProfileTag />}</Pressable>
            </Link>
          ),
          headerLeft: () => (
            <Ionicons
              style={{ marginLeft: 10 }}
              name="checkmark-circle-sharp"
              color={"dodgerblue"}
              size={30}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
