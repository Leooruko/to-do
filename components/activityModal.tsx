import { Activity } from "@/constants/interfaceList";
import { useState } from "react";
import {
  Text,
  TextInput,
  Modal,
  View,
  Button,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  Touchable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import db from "@/lib/actions";
import { useDispatch } from "react-redux";
import { addActivity, changeActivity } from "@/common/activities/actions";
import { Ionicons } from "@expo/vector-icons";
import { generateUniqueId } from "@/constants/utils";

const { width, height } = Dimensions.get("window");

export default function ActivityModal({
  details,
  closeModal,
}: {
  details?: Activity | null;
  closeModal: () => void;
}) {
  const dispatch = useDispatch();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [activityDetails, setDetails] = useState(
    details || {
      activity: null,
      type: null,
      due_on: new Date(Date.now() + 5).toString(),
      set_on: new Date(Date.now()).toString(),
      delete_on: null,
      id: null,
    }
  );
  const handleChange = (key: keyof Activity, value: string | null) => {
    if (value) {
      setDetails({ ...activityDetails, [key]: value });
    }
  };
  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    if (selectedDate) {
      const date = activityDetails.due_on
        ? new Date(activityDetails.due_on)
        : new Date();
      date.setFullYear(selectedDate.getFullYear());
      date.setMonth(selectedDate.getMonth());
      date.setDate(selectedDate.getDate());
      const newTime = new Date(date);
      handleChange("due_on", newTime.toISOString());
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date | undefined
  ) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const date = activityDetails.due_on
        ? new Date(activityDetails.due_on)
        : new Date();
      const newTime = new Date(
        date.setHours(selectedTime.getHours(), selectedTime.getMinutes())
      );
      handleChange("due_on", newTime.toISOString());
    }
  };

  const updateActivity = (activityDetails: Activity) => {
    try {
      db.modifyActivity(activityDetails);
      dispatch(changeActivity(activityDetails));
    } catch (e) {
      console.log("error dispatching: ", e);
    }
  };

  const handleSave = async () => {
    const requiredKeys = ["activity", "type", "due_on"];
    if (requiredKeys.every((key: string) => activityDetails[key] !== null)) {
      try {
        if (details) {
          updateActivity(activityDetails);
        } else {
          console.log("NO LOGS");
          activityDetails.id = await generateUniqueId();
          db.addActivity(
            activityDetails.id,
            activityDetails.activity || "",
            activityDetails.type || "",
            activityDetails.due_on || ""
          );
          dispatch(addActivity(activityDetails));
        }
      } catch (e) {
        console.log(e);
      } finally {
        closeModal();
      }
    } else {
    }
  };

  return (
    <View style={styles.modalContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContent}>
          <View style={styles.title}>
            <Text style={styles.titleText}>activity</Text>
            <Text style={styles.titleText}>{details && details.id}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Activity...e.g visit Jill"
            value={activityDetails?.activity ?? ""}
            onChangeText={(value) => handleChange("activity", value)}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={activityDetails.type}
              style={styles.picker}
              onValueChange={(value) => handleChange("type", value)}
            >
              <Picker.Item label={"select type"} value={null} />
              <Picker.Item label={"task"} value={"task"} />
              <Picker.Item label="event" value={"event"} />
            </Picker>
          </View>

          {/* Date Picker */}
          <View style={styles.timeButton}>
            <Text>
              <Text style={styles.dateText}>
                {` ${new Date(activityDetails.due_on || 0).getDay()}/${new Date(
                  activityDetails.due_on || 0
                ).getMonth()}/${new Date(
                  activityDetails.due_on || 0
                ).getFullYear()}`}
              </Text>
            </Text>
            <TouchableHighlight
              style={{
                backgroundColor: "rgba(180, 185, 244, 0.5)",
                padding: 2,
                paddingInline: 8,
                borderRadius: 4,
              }}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: "gray" }}>Set Date</Text>
            </TouchableHighlight>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={
                activityDetails.due_on
                  ? new Date(activityDetails.due_on)
                  : new Date()
              }
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {/* time picker */}
          <View style={styles.timeButton}>
            <Text style={styles.dateText}>
              {` ${new Date(
                activityDetails.due_on || 0
              ).getHours()}: ${new Date(
                activityDetails.due_on || 0
              ).getMinutes()} ${
                new Date(activityDetails.due_on || 0).getHours() >= 12
                  ? "PM"
                  : "AM"
              }`}
            </Text>
            <TouchableHighlight
              style={{
                backgroundColor: "rgba(180, 185, 244, 0.5)",
                padding: 2,
                paddingInline: 8,
                borderRadius: 4,
              }}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={{ color: "gray" }}>SetTime</Text>
            </TouchableHighlight>
          </View>
          {showTimePicker && (
            <DateTimePicker
              value={
                activityDetails.due_on
                  ? new Date(activityDetails.due_on)
                  : new Date()
              }
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
          <View style={styles.actions}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <TouchableHighlight
                onPress={handleSave}
                style={{
                  backgroundColor: "rgba(180, 185, 244, 0.53)",
                  borderRadius: 15,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    padding: 5,
                  }}
                >
                  <Ionicons name="calendar" color={"black"} size={25} />
                  <Text
                    style={{
                      verticalAlign: "middle",
                      color: "black",
                    }}
                  >
                    Save
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 5,
              }}
            >
              <TouchableHighlight
                onPress={closeModal}
                style={{
                  backgroundColor: "whitesmoke",
                  borderRadius: 15,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    padding: 5,
                  }}
                >
                  <Ionicons name="close" color={"gray"} size={30} />
                  <Text
                    style={{
                      verticalAlign: "middle",
                      color: "gray",
                    }}
                  >
                    Cancel
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    width: width,
    height: height,
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  titleText: {
    fontSize: 20,
    color: "rgba(180, 185, 244, 0.77)",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    padding: 10,
    borderRadius: 3,
    marginTop: 20,
  },
  picker: {
    width: "100%",
    height: 50,
    color: "gray",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    overflow: "hidden", // Prevents content from overflowing the border
    marginVertical: 10,
  },
  dateText: {
    marginTop: 5,
    fontSize: 16,
    color: "gray",
  },
  timeButton: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    padding: 4,
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    overflow: "hidden", // Prevents content from overflowing the border
    marginVertical: 10,
  },
});
