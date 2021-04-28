import { postUser } from "../api/api.js"

export const formatUsersData = (userData, activityData) => {
    const athleteData = userData.data.athlete
    const {username, firstname, lastname, city, country} = athleteData
    const avatarUrl = athleteData.profile

    const allActivities = activityData.data

    const routesData = []

    allActivities.map((activity) => {
        if (activity.map.summary_polyline) {
            routesData.push({
                routeName: activity.name,
                routePolyline: activity.map.summary_polyline,
                startLatLng: activity.start_latlng,
                distanceInKm: activity.distance / 1000
            })
        }
    })

    const stringifiedRoutesData = JSON.stringify(routesData)

    const formattedUserData = {
        username,
        first_name: firstname,
        last_name: lastname,
        avatar_url: avatarUrl,
        location: `${city}, ${country}`,
        routes_data: stringifiedRoutesData,
    }

    postUser(formattedUserData)

    return formattedUserData
}