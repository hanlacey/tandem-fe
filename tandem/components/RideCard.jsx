import React from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

  const parseDate = (ride_date) => {
    const weirdDate = new Date(ride_date);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const normalDate = weirdDate.toLocaleString("default", options);
    return normalDate;
  };

  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>
        {parseDate(ride_date)}
        {"\n"}
        {experience_level} {" / "} {ride_type}
        {"\n"}
        {description}
        {"\n"}
        {route_data}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile", { author })}
        >
          <Text style={styles.link}>ride created by {author}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RidePage", { ride_id })}
        ></TouchableOpacity>
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
  body: {
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  link: {
    color: "red",
  },
});

export default RideCard;
