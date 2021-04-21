import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import PageHeader from './components/PageHeader'
import ConfigureProfile from './components/ConfigureProfile'
import StravaSignup from './components/StravaSignup';
export default function App() {
  return (
    <View style={styles.container}>
      <PageHeader />
      <ConfigureProfile/>
      <StravaSignup/>
    </View>);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
