import React from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import parseDate from "../utils/parseDate";

function RideCard({ ride, route }) {
  const {
    ride_id,
    title,
    author,
    ride_date,
    route_data,
    ride_type,
    description,
    experience_level,
    created_at,
    attendees,
  } = ride;

  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title.toLowerCase()}</Text>
      <Text style={styles.description}>
        {description}
        {"\n"}
      </Text>
      <TouchableOpacity
        style={styles.description}
        onPress={() => navigation.navigate("UserProfile", { username: author })}
      >
        <Text style={styles.authorLink}>{author}</Text>
      </TouchableOpacity>
      <Text style={styles.body}>
        {parseDate(ride_date)}
        {"\n"}
        {experience_level} {" / "} {ride_type}
        {"\n"}
        {route_data}
        {"\n"}
        {attendees.length} attending
        {"\n"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginHorizontal: "5%",
    marginVertical: "5%",
    paddingBottom: "5%",
    textAlign: "center",
  },
  title: {
    backgroundColor: "#f4511e",
    padding: "5%",
    fontSize: 18,
    fontWeight: "bold",
    color: "#292929",
  },
  description: {
    backgroundColor: "#e8e8e8",
    textAlign: "center",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
  },
  body: {
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  authorLink: {
    color: "red",
    textAlign: "center",
    paddingTop: "0%",
  },
});

export default RideCard;
