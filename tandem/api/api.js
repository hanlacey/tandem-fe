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
export const getAttendeesByRideId = (ride_id) => {
  return thandemApi.get(`/rides/${ride_id}/attendees`).then((response) => {
    return response.data.attendees
  });
};
export const getCommentsByRideId = (ride_id) => {
  return thandemApi.get(`/rides/${ride_id}/comments`).then((response) => {
    return response.data.comments
  });
};

export const deleteCommentsByCommentId= (comment_id) => {
  return thandemApi.delete(`/comments/${comment_id}`) 
};

export const postCommentByRideId = (ride_id, comment) => {
  return thandemApi
    .post(`/ride/${ride_id}/${comment}`, {
      body: comment,
				ride_id: 1,
				author: "t0gden",
				votes: 0,
				created_at: new Date(),
    })
    .then((response) => {
      return response.data.comment[0];
    })
};

export const postUser = (newUserData) => {
  console.log(newUserData, "newUserData")
  return thandemApi.post("/users", newUserData).then(({ data }) => {
    console.log(data, "POST request response")
  }).catch((err) => {
    console.log(err)
  })
}
export const postRide = (newRide) => {
  console.log(newRide, "*** inside postRide API call ***")
  return thandemApi.post("/rides", newRide).then(({ data }) => {
    return (data)
  })
}
