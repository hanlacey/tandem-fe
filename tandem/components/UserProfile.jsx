import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import users from "../assets/users";
import rideData from "../assets/rides";
import parseDate from "../utils/parseDate";

export default class UserProfile extends Component {
  state = {
    user: {},
    rides: [],
  };

  //atm constructor is only needed for filtering sample data
  constructor(props) {
    super(props);
    const username = this.props.route.params.username;
    this.getUserInfo = () => {
      const user = users.filter((user) => {
        return user.username === username;
      });
      return user[0];
    };
    this.getUserRides = () => {
      const rides = rideData.filter((ride) => {
        return ride.attendees.includes(username);
      });
      return rides;
    };
  }

  componentDidMount() {
    //make fetch request to db by username instead of getUserInfo()
    this.setState({ user: this.getUserInfo() });
    this.setState({ rides: this.getUserRides() });
  }

  render() {
    const { rides, user } = this.state;

    const userRideList = () => {
      return rides.map((ride) => {
        return (
          <View key={ride.ride_id} style={styles.ride}>
            <Text style={styles.rideTitle}>{ride.title} </Text>
            <Text style={styles.rideDescription}>
              {ride.author} - {parseDate(ride.ride_date)} -{" "}
              {ride.attendees.length} riders
            </Text>
          </View>
        );
      });
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
            <Text style={styles.name}>{user.username} </Text>
            <Text style={styles.userInfo}>
              {user.bike_type} {"  /  "} {user.experience_level}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.rideListHeader}>
            {user.username}'s active rides
          </Text>
          {userRideList(this.parseDate)}
        </View>
      </View>
    );
  }
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
    textAlign: "center",
  },
  rideListHeader: {
    textAlign: "center",
    backgroundColor: "#FF4500",
    padding: "5%",
  },
  ride: {
    backgroundColor: "white",
    marginHorizontal: "5%",
    marginVertical: "2%",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    borderRadius: 3,
  },
  rideTitle: {
    color: "red",
  },
  rideDescription: {},
});
