import { StyleSheet, TextInput, TouchableHighlight } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import ActivityList from "@/components/activitiesList";
import { useState } from "react";

export default function TabOneScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.container}>
      {/* Search and add events */}
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search activities..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableHighlight>
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
      </View>
      {/* Activities list */}
      <ActivityList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: "relative",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  searchInput: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    fontSize: 30,
    backgroundColor: "dodgerblue",
    borderRadius: 7,
    textAlign: "center",
    aspectRatio: 1,
    verticalAlign: "middle",
    padding: 5,
    color: "white",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
    marginTop: 30,
  },
});
