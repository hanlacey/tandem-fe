import 'react-native-gesture-handler';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './components/Tabs'
import BottomTabNavigator from "./components/Tabs";

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <BottomTabNavigator />
        </NavigationContainer>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "red"
    }
})