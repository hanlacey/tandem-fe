// import * as React from "react";
// import MapView, { Marker, Polyline } from "react-native-maps";
// import { StyleSheet, Text, View, Dimensions } from "react-native";
// import polyline from "@mapbox/polyline";

// export default function MapComponent() {
// 	// hardcoded polyline from Strava, while we don't have access to Strava API or a backend with user routes stored
// 	const polylineData =
// 		"}xxdI~eaHQb@FTNP~@ZX\\M`@{@|ADHXd@bBTTNXp@A\\HVQb@J|@h@r@JZZBRRN\\|@lAh@jAAtBT~Dx@x@`CJb@bAr@dAdAx@fAnAV`@j@`Bp@rCn@zA\\vA`@~@|@z@hApAdApAzA~Bf@zAD?v@fBzB|G`@f@x@`@d@dA@n@TrBj@dDVhGIrCL|@h@xADZC\\L|BGdC]pDk@~EoAtEq@|@gD~DmBrCCJBXUl@]^e@lAAXYZEz@NlAE`AL~DRtCLz@pArF`DhJn@xBv@zDnBbHrB|IrHzSl@z@tD|D~CbMd@fDLhCTvBFjCH|@p@tCbAjCn@pC`@lA|@bFNtCH`DWlD^hDfAhE`@fCBfAGtCFz@Tp@pAjBPv@jBxO@h@KfCAzDOrCB\\E`CGzB^xET`AK|ACvAm@dBGh@GnA@`DPzBhAxEBhAIf@g@vAO^QNe@pAa@nDYrAWj@{@z@o@^Q\\uAnDU|AFtFr@zGNb@`@^r@dAb@jAAb@Ox@Un@wBbDUh@c@tCEnFg@vQIpCYjDEvAOdSYnEUvAGbBPtGHrFT`DNv@Rb@ZIfCgBX{@NeA`@i@J@PDHRPjAHfBd@xB^jAh@z@`BWnFEnASn@[fAIlGfApBj@|BTpCf@p@}@j@mAR}@P}AJqCSeDCoFPcIX_DbBsIlAmCjCsDbAeChByFt@gAx@i@x@@b@Tx@rAT?\\oA^qClBuKbBcIpCyHr@_BjCwE`@qAf@_AP_AFwAM}Co@gHu@ePy@_NgAeX[}CaAeOk@mGkAuV}AwT]kLAoDQyDLcBMuC_@{Gu@qFGaBe@_FEcA]sB]qE_@gBgBkEc@kAAW[eLEyGHkGl@kJ?sBaBoZVoJRmDe@u@yCgBmBwAWg@k@cDYa@{DiBiD_F{@y@aAk@oDuAcBa@gAH_Bj@s@@gTwAmCwAgAw@u@y@y@{Ai@mBcAoNWkBa@aA{@]O[Ae@L}AYsB[i@USu@iCaAsHYmEo@qGAcAgAoFQyAu@kDcA{Da@aCs@_CQcAw@eByAmGe@eC_@}@WgEuAsFqAwCYoAEqCH}@k@wDMkE_@}Cw@iA{AkAMUc@cD]e@?KR[I[i@i@g@iBuA_Dk@iBY]eBzA_BP_B`BcAhBkAfAsCbDMAgA|@{@dAy@^OhAUj@";

// 	const decodedCoords = polyline.decode(polylineData);

// 	let startLatitude = decodedCoords[0][0];
// 	let startLongitude = decodedCoords[0][1];
// 	let startLatLng = {
// 		latitude: startLatitude,
// 		longitude: startLongitude,
// 	};

// 	let endLatitude = decodedCoords[decodedCoords.length - 1][0];
// 	let endLongitude = decodedCoords[decodedCoords.length - 1][1];
// 	let endLatLng = {
// 		latitude: endLatitude,
// 		longitude: endLongitude,
// 	};

// 	let formattedCoords = [];

// 	for (let i = 0; i < decodedCoords.length; i++) {
// 		formattedCoords.push({
// 			latitude: decodedCoords[i][0],
// 			longitude: decodedCoords[i][1],
// 		});
// 	}

// 	return (
// 		<View style={styles.container}>
// 			<MapView
// 				style={styles.map}
// 				initialRegion={{
// 					latitude: startLatitude,
// 					longitude: startLongitude,
// 					latitudeDelta: 0.0822,
// 					longitudeDelta: 0.0421,
// 				}}
// 			>
// 				<Marker title="Start" coordinate={startLatLng} pinColor="green" />

// 				<Marker title="End" coordinate={endLatLng} pinColor="red" />

// 				<Polyline
// 					coordinates={formattedCoords}
// 					strokeColor="#FF0000"
// 					strokeWidth={3}
// 				/>
// 			</MapView>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	map: {
// 		width: Dimensions.get("window").width,
// 		height: Dimensions.get("window").height,
// 	},
// });
