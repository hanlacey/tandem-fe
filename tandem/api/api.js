import axios from "axios"

const thandemApi = axios.create({
  baseURL: "https://thandem.herokuapp.com/api",
});

<<<<<<< HEAD
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
export const postUser = (newUserData) => {
  //TODO: create POST request to DB

  console.log(newUserData)
}
=======
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
>>>>>>> 93721c264386459412f7442fe8daffa95762d254
