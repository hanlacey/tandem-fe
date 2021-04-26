import axios from "axios"

const thandemApi = axios.create({
    baseURL: "https://thandem.herokuapp.com/api",
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
export const postUser = (newUserData) => {
    //TODO: create POST request to DB
    
    console.log(newUserData)
}