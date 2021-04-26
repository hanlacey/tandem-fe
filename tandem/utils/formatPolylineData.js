const polyline = require("@mapbox/polyline")

export const formatPolylineData = (polylineData) => {
    const decodedCoords = polyline.decode(polylineData);

    let startLatitude = decodedCoords[0][0];
    let startLongitude = decodedCoords[0][1];
    let startLatLng = {
        latitude: startLatitude,
        longitude: startLongitude,
    };

    let endLatitude = decodedCoords[decodedCoords.length - 1][0];
    let endLongitude = decodedCoords[decodedCoords.length - 1][1];
    let endLatLng = {
    latitude: endLatitude,
    longitude: endLongitude,
    };

    let formattedCoords = [];

    for (let i = 0; i < decodedCoords.length; i++) {
        formattedCoords.push({
            latitude: decodedCoords[i][0],
            longitude: decodedCoords[i][1],
        });
    }


    return {
        formattedCoords,
        startLatLng,
        startLatitude,
        startLongitude,
        endLatLng,
        endLatitude,
        endLongitude, 
    }
}