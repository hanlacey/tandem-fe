import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Tandem</Text>
        <Button
          color="#FF4500"
          title={"Signup with Strava"}
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  header: {
    fontSize: 21,
    color: "black",
    fontWeight: "bold",
    paddingVertical: 100,
  },
});
