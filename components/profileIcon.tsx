import { Image, View, StyleSheet } from "react-native";
export default function ProfileTag() {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/images/profile.png")}
          width={10}
          height={10}
        />
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
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 25,
    backgroundPosition: "center",
  },
});
