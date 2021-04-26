import React, { useState, useEffect} from 'react';
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import parseDate from "../utils/parseDate";
import * as API from "../api/api"

export default function CommentList({ride}) {
  const [commentsData, setComments] = useState([]);
  const navigation = useNavigation();

  useEffect(()=>{
		API.getCommentsByRideId(ride.ride_id).then((comments) => {
		setComments(comments)})
		}, [ride.ride_id])
	

  return (
    <FlatList
      style={styles.root}
      data={commentsData}
      ItemSeparatorComponent={() => {
        return (
          <View style={styles.separator} />
        )
      }}
      keyExtractor={(item) => {
        return item.author;
      }}
      renderItem={(item) => {
        const User = item.item;
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("UserProfile", { username: item.author })}>
              {/* <Image style={styles.image} source={{ uri: User.avatar_url }} /> */}
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>{User.author}</Text>
                <Text style={styles.time}>
                {parseDate(User.created_at)}
                {User.votes}
                  </Text>
              </View>
              <Text rkType='primary3 mediumLine'>{User.body}</Text>
              {/* <Text style={styles.time}> Likes: {User.votes}</Text> */}
            </View>
          </View>
        );
      }} />
  );

}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 10,
    backgroundColor: "#f2f2f2",
   
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
}); 