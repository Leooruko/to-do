import { Ionicons } from "@expo/vector-icons";
import { Image, View, StyleSheet } from "react-native";
export default function ProfileTag() {
  return (
    <>
      <View style={styles.container}>
        <Ionicons name="settings" color={"#333"} size={30}></Ionicons>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginRight: 10,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    borderRadius: 25,
    backgroundPosition: "center",
  },
});
