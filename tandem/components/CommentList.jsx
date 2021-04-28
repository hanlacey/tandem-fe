import React, { useState, useEffect } from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	FlatList,
	Button,
	TextInput,
} from "react-native";
import parseDate from "../utils/parseDate";
import * as API from "../api/api";

export default function CommentList({ ride, user }) {
	const [text, setText] = React.useState("");
	const [comments, setComment] = useState([]);
	const navigation = useNavigation();
	const { ride_id } = ride;
	const { username } = user;

	useEffect(() => {
		API.getCommentsByRideId(ride_id).then((comments) => {
			setComment(comments);
		});
		console.log(text);
	}, [ride_id, text]);

	deleteComment = (comment_id) => {
		API.deleteCommentsByCommentId(comment_id).then(() => {
			const updatedComments = list.filter(
				(item) => item.comment_id !== comment_id
			);
			setComments(updatedComments);
		});
	};

	handleChange = (event) => {
		API.postCommentByRideId(ride_id, text, username).then((newComment) => {
			setComment([newComment, ...comments]);
		});
	};

	return (
		<View>
			<TextInput
				value={text}
				placeholder="write..."
				onChangeText={(text) => {
					setText(text);
				}}
				onSubmitEditing={handleChange}
			/>
			{comments.map((comment) => {
				return (
					<View key={comment.comment_id} style={styles.container}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("UserProfile", { username: item.username })
							}
						>
							<Image
								style={styles.image}
								source={{ uri: comment.avatar_url }}
							/>
						</TouchableOpacity>
						<View style={styles.content}>
							<View style={styles.contentHeader}>
								<Text style={styles.name}>{comment.author}</Text>
								<Text style={styles.time}>{parseDate(comment.created_at)}</Text>
							</View>
							<Text rkType="primary3 mediumLine">{comment.body}</Text>
							<TouchableOpacity
								onPress={() => deleteComment(comment.comment_id)}
							>
								<Icon name="delete" size={20} color="#e33057" />
							</TouchableOpacity>
						</View>
					</View>
				);
			})}
		</View>
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
		flexDirection: "row",
		alignItems: "flex-start",
	},
	content: {
		marginLeft: 16,
		flex: 1,
	},
	contentHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	separator: {
		height: 1,
		backgroundColor: "#CCCCCC",
	},
	image: {
		width: 45,
		height: 45,
		borderRadius: 20,
		marginLeft: 20,
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
