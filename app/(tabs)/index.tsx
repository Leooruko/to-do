import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Modal,
  TouchableNativeFeedback,
} from "react-native";
import ActivityModal from "@/components/activityModal";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import ActivityList from "@/components/activitiesList";
import { useState } from "react";
import { useTheme } from "@/constants/themeContext";
export default function TabOneScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View
      style={[styles.container, useTheme().theme.dark && styles.darkBackground]}
    >
      {/* Search and add events */}
      <View
        style={[
          styles.buttonContainer,
          useTheme().theme.dark && styles.darkBackground,
        ]}
      >
        <View style={styles.inputOutline}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search activities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
          <Text
            style={[
              styles.buttonText,
              useTheme().theme.dark && styles.darkText,
            ]}
          >
            Add+
          </Text>
        </TouchableNativeFeedback>
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
    // paddingHorizontal: 10,
    borderRadius: 15,
    paddingLeft: 10,
  },
  inputOutline: {
    flex: 1,
    elevation: 2,
    borderRadius: 15,
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 20,
    backgroundColor: "dodgerblue",
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    shadowOpacity: 0.2,
    borderRadius: 18,
    textAlign: "center",
    // aspectRatio: 1,
    flexGrow: 0.1,
    verticalAlign: "middle",
    color: "white",
    justifyContent: "center",
    display: "flex",
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
  darkBackground: {
    backgroundColor: "rgba(0, 0, 0,0.9)",
  },
  darkText: {
    color: "white",
  },
});
