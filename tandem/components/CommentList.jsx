import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Button,
  TextInput
} from 'react-native';
import parseDate from "../utils/parseDate";
import * as API from "../api/api"

export default function CommentList({ ride }) {
  const [text, setText] = React.useState("");
  const [commentsData, setComments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    API.getCommentsByRideId(ride.ride_id).then((comments) => {
      setComments(comments)
    })
  }, [ride.ride_id])


  deleteComment = (comment_id) => {
    useEffect(() => {
      API.deleteCommentsByCommentId(comment_id).then(() => {
        const updatedComments = list.filter((item) => item.comment_id !== comment_id);
        setComments(updatedComments)
      })
    }, [comment_id])
  }
  //deletes on refresh 


  addComment = (newComment, ride_id) => {
    API.postCommentByRideId(newComment, ride_id).then(() => {
      setComments(newComment)
    })
  }

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
        const comment = item.item;
        return (
          <View style={styles.container}>
            <TextInput
              value={text}
              placeholder="write..."
              onChangeText={text => setText(text)}
              onSubmitEditing={() => addcomment(text, ride.ride_id)}
            />
            <TouchableOpacity onPress={() => navigation.navigate("UserProfile", { username: item.author })}>
              {/* <Image style={styles.image} source={{ uri: comment.avatar_url }} /> */}
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>{comment.author}</Text>
                <Text style={styles.time}>
                  {parseDate(comment.created_at)}
                  {comment.votes}
                </Text>
              </View>
              <Text rkType='primary3 mediumLine'>{comment.body}</Text>
              {/* <Text style={styles.time}> Likes: {comment.votes}</Text> */}
              <TouchableOpacity onPress={() => deleteComment(comment.comment_id)}>
                <Icon name="delete" size={20} color="#e33057" />
              </TouchableOpacity>
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