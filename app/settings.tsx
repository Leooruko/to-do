import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Switch } from "react-native";
import { useTheme } from "@/constants/themeContext";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
export default function ModalScreen() {
  const { theme, toggleTheme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[theme.dark ? "dark" : "light"].background },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors[theme.dark ? "dark" : "light"].background,
        }}
      >
        <Text
          style={[
            styles.title,
            { color: Colors[theme.dark ? "dark" : "light"].text },
          ]}
        >
          {theme.dark ? "Dark" : "Light"}
        </Text>
        <Switch
          // rackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={true ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onChange={toggleTheme}
          value={theme.dark}
          // onValueChange={toggleSwitch}
          // value={isDarkMode}
        />
      </View>
      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    verticalAlign: "middle",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
