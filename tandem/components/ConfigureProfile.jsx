import React, { PureComponent } from "react";
import { Text, TextInput, View } from "react-native";

export default class ConfigureProfile extends PureComponent {
  state = {
    user_id: "",
    location: "",
    bikeType: "",
    experienceLevel: "",
  };

  render() {
    return (
      <View>
        <TextInput></TextInput>
      </View>
    );
  }
}
