import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import PageHeader from './components/PageHeader'

export default function App() {
  return (
    <View>
      <PageHeader />
    </View>);
}
const styles = StyleSheet.create({
  container: {
    display: 'flexbox',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#2e2e2e'
  }
});
