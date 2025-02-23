import { StyleSheet, TextInput, TouchableHighlight, Modal } from "react-native";
import ActivityModal from "@/components/activityModal";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import ActivityList from "@/components/activitiesList";
import { useState } from "react";

export default function TabOneScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
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
        <TouchableHighlight onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
        <Modal
          visible={modalVisible}
          // animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
          style={styles.modal}
        >
          <ActivityModal closeModal={closeModal} />
        </Modal>
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
  modal: {
    flex: 1,
  },
});
