import axios from "axios"

import { REACT_APP_BACKEND_API_BASE_URL } from "@env"

const backendApi = axios.create({
    baseURL: REACT_APP_BACKEND_API_BASE_URL,
})

export const postUser = (newUserData) => {
    console.log(newUserData, "newUserData")
    return backendApi.post("/users", newUserData).then(({ data }) => {
        console.log(data, "POST request response")
    }).catch((err) => {
        console.log(err)
    })

}