import { postUser } from "../api/api"

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
                startLatLng: activity.start_latlng
            })
        }
    })

    const formattedUserData = {
        username,
        first_name: firstname,
        last_name: lastname,
        avatar_url: avatarUrl,
        location: `${city}, ${country}`,
        routes_data: routesData.toString(),
    }

    postUser(formattedUserData)
}