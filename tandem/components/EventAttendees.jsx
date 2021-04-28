import React, { useState, useEffect } from 'react';
import * as API from "../api/api";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';


export default function EventAttendees ({navigation, route}) {
	const [attendees, setAttendees] = useState([]);
  const { ride } = route.params;

  useEffect(() => {
		API.getAttendeesByRideId(ride.ride_id).then((attendees) => {
			setAttendees(attendees);
		});
  }, [ride.ride_id]);
  

    return (
      <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.title}>Event Attendees</Text>
            <FlatList 
              style={styles.container} 
              enableEmptySections={true}
              data={attendees}
              keyExtractor= {(item) => {
                return item.username;
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity onPress={() => navigation.navigate("UserProfile", { username: item.username })}>
                    <View style={styles.box}>
                       <Text style={styles.username}>{item.first_name}</Text>
                       {/* <TouchableOpacity style={styles.button} color="#FF4500"  title="Add me">Follow</TouchableOpacity> */}
                    </View>
                  </TouchableOpacity>
                )
            }}/>
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
  image:{
    width: 80,
    height: 80,
    borderRadius: 63,
    marginBottom: 10,
  },
  body: {
    padding:30,
    backgroundColor :"#E6E6FA",
  },
  box: {
    padding:5,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .6,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "black",
    fontSize:15,
    alignSelf:'center',
    marginLeft:10,
    marginRight: 30,
    fontWeight: 'bold' 
  },
  title:{
    color: "black",
    fontSize:30,
    marginLeft:10,
    fontWeight: 'bold',
    marginBottom:5,
  },
  container:{
    backgroundColor :"#E6E6FA",
    height: "100%",
  },
  button:{
    color: "white",
    fontWeight: 'bold',
    height:35,
    justifyContent: 'center',
    alignItems: 'center',
    width:100,
    marginHorizontal: 30,
    marginVertical:30,
    borderRadius:30,
    backgroundColor:"#FF4500",
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  }
  
});