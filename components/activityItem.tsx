import { Activity } from "@/constants/interfaceList";
import { Text, TouchableOpacity, Modal, View, StyleSheet } from "react-native";
export default function ActivityCard({ activity }: { activity: Activity }) {
  const getNameStyle = (type: string) => ({
    color: type === "event" ? "#333" : "dodgerblue",
  });

  return (
    <View>
      <Text style={[styles.name, getNameStyle(activity?.type || "default")]}>
        {activity.activity}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.type}>{activity.type}</Text>
        <View style={{ alignSelf: "flex-end" }}>
          <Text>{new Date(activity.due_on).toLocaleDateString()}</Text>
          <Text>{new Date(activity.due_on).toLocaleTimeString()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    color: "#333",
    fontFamily: "Roboto",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  type: {
    fontSize: 12,
    shadowOpacity: 0.2,
    width: 60,
    display: "flex",
    justifyContent: "center",
    verticalAlign: "middle",
    textAlign: "center",
    elevation: 1,
  },
});
