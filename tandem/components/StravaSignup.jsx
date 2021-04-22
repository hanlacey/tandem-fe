import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default class App extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Button
          color="#FF4500"
          title={"Signup with Strava"}
          style={styles.input}
          onPress={() => navigation.navigate("ConfigureProfile")}
        />
        <Button
          title={"View routes"}
          style={styles.button}
          onPress={() => navigation.navigate("MapComponent")}
          color="#841584"
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
});
