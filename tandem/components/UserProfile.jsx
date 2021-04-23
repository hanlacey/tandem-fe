import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import sampleRides from "../utils/rideListGenerator";

export default function UserProfile() {
  const [name, setName] = useState("Boris Johson");
  const [age, setAge] = useState("45");
  const [userBikeType, setUserBikeType] = useState("mountain");
  const [userDifficulty, setUserDifficulty] = useState("casual");
  const [userRides, setUserRides] = useState(sampleRides);

  useEffect(() => {
    setUserRides(
      sampleRides.filter(
        (ride) =>
          ride.rideBikeType === userBikeType &&
          ride.rideDifficulty === userDifficulty
      )
    );
  }, [sampleRides]);

  const userRideList = () => {
    return userRides.map((ride) => {
      return (
        <View key={ride.rideId} style={styles.openRide}>
          <Text style={styles.ride}>{ride.rideCreator}'s ride</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://i.imgur.com/wpA5DVi.jpg",
            }}
          />

          <Text style={styles.name}>{name} </Text>
          <Text style={styles.userInfo}> {age}, London </Text>
          <Text style={styles.userInfo}>
            {" "}
            Bike Type:{userBikeType} - Difficulty:{userDifficulty}
          </Text>
        </View>
      </View>
      <View style={styles.userRides}>
        <Text>Open rides</Text>
        <Text style={styles.ride}>{userRideList()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f2f3f4",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FF4500",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  userRides: {
    flexWrap: "wrap",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  ride: {
    backgroundColor: "white",
  },
});
