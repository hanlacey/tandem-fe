import axios from "axios"

import { REACT_APP_BACKEND_API_BASE_URL } from "@env"

const thandemApi = axios.create({
  baseURL: REACT_APP_BACKEND_API_BASE_URL,
});

export const getAllRides = () => {
  return thandemApi.get("/rides").then((response) => {
    return response.data.rides;
  });
};

export const getFilteredRides = (query) => {
  console.log(query)
  return thandemApi.get(`/rides?${query}`).then(({ data }) => {
    return data.rides
  })
}
export const getAttendeesByRideId = (ride_id) => {
  return thandemApi.get(`/rides/${ride_id}/attendees`).then((response) => {
    return response.data.attendees
  });
};

export const deleteAttendeeByRideId = (attendee, ride_id) => {
  console.log(attendee, 'api attendee')
  return thandemApi.delete(`/rides/${ride_id}/attendees/${attendee}`)
}

export const getCommentsByRideId = (ride_id) => {
  return thandemApi.get(`/rides/${ride_id}/comments`).then((response) => {
    return response.data.comments
  });
};

export const deleteCommentsByCommentId = (comment_id) => {
  return thandemApi.delete(`/comments/${comment_id}`)
};

export const postCommentByRideId = (ride_id, commentBody, username) => {

  const newComment = { body: commentBody, username }
  return thandemApi
    .post(`/rides/${ride_id}/comments`, newComment)
    .then((response) => {
      console.log(response.data.newComment)
      return response.data.newComment;
    }).catch((err) => {
      console.log(err)
    })
};

export const postUser = (newUserData) => {
  console.log(newUserData, "newUserData")
  return thandemApi.post("/users", newUserData).then(({ data }) => {
    // console.log(data, "POST request response")
  }).catch((err) => {
    console.log(err)
  })
}
export const postRide = (newRide) => {
  return thandemApi.post("/rides", newRide).then(({ data }) => {
    return data.newRide
  })
}



export const postUserToRideAttendees = (attendee, ride_id) => {
  console.log(attendee, ride_id)
  return thandemApi.post(`/rides/${ride_id}/attendees`, attendee).then(({ data }) => {
    console.log(data)
    return data.newAttendee
  })
}

export const deleteUserFromRideAttendees = (attendee_id) => {
  console.log(attendee_id)
  return thandemApi.post(`/api/attendees/${attendee_id}`)
}
