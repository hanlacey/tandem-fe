
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import {StyleSheet,Text} from 'react-native';
const ride =
{
  ride_id: "2",
  author: "raofRides",
  ride_date: 1612329163389,
  route_data: "Manchester",
  ride_type: "road",
  title: "Manchester loop",
  description: "anyone want to join me on a loop around manchester",
  experience_level: "challenging",
  created_at: 1601324163389,
  attendees: ['raofRides', 'nadia200', 't0gden']
}

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function SingleRide() {
  const [text, setText] = React.useState('');
  return (
    <Card style={styles.container}>
      <Card.Title title={ride.route_data} subtitle={ride.experience_level} subtitle={ride.ride_type}/>
      <Card.Content>
        {/* <Title>{ride.route_data}</Title> */}
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content>
        <Paragraph>{ride.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
      <Text>Make a comment</Text>
      <TextInput
        label="write.."
        value={text}
        onChangeText={text => setText(text)}
      />

    </Card>

  )
};

const styles = StyleSheet.create({
  container:{
    marginHorizontal: 30,
    marginTop: 20,
    marginVeritcal: 10
    
  }
})