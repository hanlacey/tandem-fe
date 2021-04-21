import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default class UserProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  "data:image/jpeg;base64,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",
              }}
            />

            <Text style={styles.name}>Boris Johnson </Text>
            <Text style={styles.userInfo}> 45, London </Text>
            <Text style={styles.userInfo}>
              {" "}
              Road Bike - Beginner - Three Past Rides{" "}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text>Open rides</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 2</Text>
          </TouchableOpacity>
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
  },
  body: {
    backgroundColor: "white",
    height: 800,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  buttonContainer: {
    marginTop:10,
    height:80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:400,
    borderRadius:30,
    backgroundColor: "#FF4500",
  },
});
