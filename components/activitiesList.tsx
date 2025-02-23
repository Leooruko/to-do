import { View, Text, StyleSheet } from "react-native";
import { Activity } from "@/constants/interfaceList";
import db from "@/lib/actions";
import { useEffect, useState } from "react";
import { getActivities } from "@/common/activities/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
export default function ActivityList() {
  // let activities;
  const [loading, setLoading] = useState(true);
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
  return (
    <View className="container">
      {/* Title */}
      <Text style={styles.title}>Activities</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : Array.isArray(activities) && activities.length > 0 ? (
        activities
          ?.filter((activity): activity is Activity => activity !== null)
          .map((activity) => {
            return (
              <View key={activity.activity} style={styles.activity}>
                <Text>{activity.type}</Text>
                <Text>{activity.activity}</Text>
                <Text>{new Date(activity.due_on).toDateString()}</Text>
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
