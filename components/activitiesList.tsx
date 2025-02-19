import { View, Text, StyleSheet } from "react-native";
import { Activity } from "@/constants/interfaceList";
import db from "@/lib/actions";
import { useEffect, useState } from "react";

export default function ActivityList() {
  const database = db;
  // let activities;
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getActivities() {
      try {
        setActivities(await database.fetchActivities());
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    getActivities();
  }, []);
  return (
    <View className="container">
      {/* Title */}
      <Text style={styles.title}>Activities</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : activities.length > 0 ? (
        activities.map((activity: Activity) => {
          return (
            <View key={activity.activity} style={styles.activity}>
              <Text>{activity.type}</Text>
              <Text>{activity.activity}</Text>
              <Text>{new Date(activity.set_on).toDateString()}</Text>
            </View>
          );
        })
      ) : (
        <Text>No activities</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  activity: {
    display: "flex",
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "200",
    color: "gray",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderColor: "gray",
    margin: 10,
    borderRadius: 15,
  },
});
