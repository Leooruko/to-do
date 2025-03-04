import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Activity } from "@/constants/interfaceList";
import db from "@/lib/actions";
import { useEffect, useState } from "react";
import { getActivities, removeActivity } from "@/common/activities/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import ActivityCard from "./activityItem";
import ActivityModal from "./activityModal";
export default function ActivityList() {
  // let activities;
  const [loading, setLoading] = useState(true);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const activities = useSelector((state: RootState) =>
    Array.isArray(state.activities.activities)
      ? state.activities.activities
      : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getActivities();
    setLoading(false);
  }, [dispatch]);

  function selectItem(id: string | null) {
    if (id && !selectionMode) {
      setSelectionMode(true);
      if (selection.size === 0) {
        setSelected(id);
      } else {
        setSelected(null);
      }
      setSelection((prev) => {
        const newSelection = new Set(prev);
        id !== null && newSelection.add(id);
        return newSelection;
      });
    }
  }
  function AddSelection(id: string | null) {
    if (id && selectionMode) {
      if (!selection.has(id)) {
        setSelection((prev) => {
          const newSelection = new Set(prev);
          newSelection.add(id);
          return newSelection;
        });
      } else {
        if (selection.size === 1) setSelectionMode(false);
        const newSelection = new Set(selection);
        newSelection.delete(id);
        setSelection(newSelection);
      }
    }
  }

  const getActivityStyle = (type: string) => ({
    backgroundColor: type === "event" ? "cyan" : "whitesmoke",
    marginInline: 3,
    padding: 15,
    borderRadius: 10,
    marginBottom: 3,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Activities</Text>
        {selectionMode && (
          <View style={styles.crudActions}>
            <Ionicons
              name="trash"
              size={25}
              color={"red"}
              onPress={() => {
                if (selection) {
                  selection.forEach((id) => {
                    dispatch(removeActivity(id));
                    db.deleteActivity(id);
                  });
                  setSelection(new Set());
                  setSelectionMode(false);
                }
              }}
            />
            {selection.size === 1 && (
              <Ionicons
                name="pencil"
                size={25}
                color={"dodgerblue"}
                onPress={() => setModalVisible(true)}
              />
            )}
          </View>
        )}
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : Array.isArray(activities) && activities.length > 0 ? (
        <FlatList
          style={styles.list}
          data={activities.filter?.(
            (activity): activity is Activity => activity !== null
          )}
          keyExtractor={(item) =>
            item.activity !== null ? item.activity : "1"
          }
          renderItem={({ item: activity }) => (
            <TouchableOpacity
              onLongPress={() => selectItem(activity.id)}
              onPress={() => AddSelection(activity?.id)}
              style={[
                getActivityStyle(activity?.type || "default"),
                selectionMode &&
                  (!selection.has(activity.id ?? "")
                    ? styles.unselected
                    : styles.selected),
              ]}
            >
              <ActivityCard activity={activity} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No activities</Text>
      )}
      <Modal
        visible={modalVisible}
        // animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
        style={styles.modal}
      >
        <ActivityModal
          closeModal={closeModal}
          details={
            activities?.find(
              (activity): activity is Activity =>
                activity !== null &&
                !Array.isArray(activity) &&
                activity.id === selected
            ) || null
          }
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    // fontWeight: "bold",
    color: "gray",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  date: {},
  list: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(234, 228, 228, 0.5)",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 20,
  },
  crudActions: {
    display: "flex",
    flexDirection: "row",
    flex: 0.3,
    justifyContent: "flex-end",
    gap: 5,
  },
  selected: {},
  unselected: {
    opacity: 0.3,
  },
  modal: {
    flex: 1,
  },
});
