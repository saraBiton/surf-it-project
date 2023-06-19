// import React, { useEffect, useState } from "react";
// import {
//   GoogleMap,
//   Marker,
//   withGoogleMap,
//   withScriptjs,
//   DirectionsRenderer,
// } from "@react-google-maps/api";

// import {
//   View,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   Text,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import MarkerMap from "../lifeguard/mapOfLocation";

// const MapWithDirections = ({ locations }) => {
//   const [directions, setDirections] = useState(null);

//   useEffect(() => {
//     const directionsService = new window.google.maps.DirectionsService();

//     const waypoints = locations.map((location, index) => ({
//       location: { lat: location.lat, lng: location.lng },
//       stopover: index !== 0 && index !== locations.length - 1,
//     }));

//     const origin = waypoints[0].location;
//     const destination = waypoints[waypoints.length - 1].location;

//     waypoints[0] = { location: origin, stopover: false };
//     waypoints[waypoints.length - 1] = { location: destination, stopover: true };

//     directionsService.route(
//       {
//         origin: origin,
//         waypoints: waypoints,
//         destination: destination,
//         optimizeWaypoints: true,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//           console.log(origin);
//           console.log(waypoints);
//           console.log(destination);
//         } else {
//           console.error("Error fetching directions:", result);
//         }
//       }
//     );
//   }, [locations]);

//   return (
//     <GoogleMap defaultZoom={8} defaultCenter={locations[0]}>
//       {directions && <DirectionsRenderer directions={directions} />}
//       {locations.map((location, index) => (
//         <Marker
//           key={index}
//           position={{ lng: location.lat, lat: location.lng }}
//         />
//       ))}
//     </GoogleMap>
//   );
// };

// const WrappedMapWithDirections = withScriptjs(withGoogleMap(MapWithDirections));

// const MapTry = (props) => {
//   const { responseFromNode } = props.route.params;
//   const [locations, setLocations] = useState([]);
//   const [selectedRoute, setSelectedRoute] = useState(null);

//   useEffect(() => {
//     const newLocations = [];

//     for (let i = 0; i < responseFromNode.AllPaths.length; i++) {
//       console.log(responseFromNode.AllPaths[i]);
//       for (let j = 0; j < responseFromNode.AllPaths[i].length; j++) {
//         const location = responseFromNode.AllPaths[i][j].Location;
//         newLocations.push({ lng: location.lat, lat: location.lng });
//       }
//     }

//     setLocations(newLocations);
//   }, []);

//   const handleRouteSelect = (index) => {
//     setSelectedRoute(index);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {selectedRoute === null ? (
//         <View style={{ flex: 1 }}>
//           {responseFromNode.AllPaths.map((path, i) => (
//             <View key={i} style={{ marginBottom: 20 }}>
//               <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//                 Route {i + 1}:
//               </Text>
//               <FlatList
//                 data={path}
//                 keyExtractor={(item) => item.Id.toString()}
//                 renderItem={({ item }) => (
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       alignItems: "center",
//                       marginBottom: 10,
//                     }}
//                   >
//                     <Text style={{ marginRight: 10 }}>
//                       Junction {item.Id}: (location: {item.Location.lat},{" "}
//                       {item.Location.lng}), (motor type: {item.MotorType}),
//                       (battery amount: {item.Battery_quantity})
//                     </Text>
//                     <TouchableOpacity onPress={() => handleRouteSelect(i)}>
//                       <Text style={{ color: "blue" }}>
//                         Show route on the map
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               />
//             </View>
//           ))}
//         </View>
//       ) : (
//         <View style={{ flex: 1 }}>
//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//               Route {selectedRoute + 1}:
//             </Text>
//             <FlatList
//               data={responseFromNode.AllPaths[selectedRoute]}
//               keyExtractor={(item) => item.Id.toString()}
//               renderItem={({ item }) => (
//                 <Text style={{ marginBottom: 10 }}>
//                   Junction {item.Id}: (location: {item.Location.lat},{" "}
//                   {item.Location.lng}), (motor type: {item.MotorType}), (battery
//                   amount: {item.Battery_quantity})
//                 </Text>
//               )}
//             />
//             <TouchableOpacity onPress={() => setSelectedRoute(null)}>
//               <Text style={{ color: "blue" }}>Show all routes</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{ flex: 1 }}>
//             <WrappedMapWithDirections
//               googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ&libraries=places"
//               loadingElement={<View style={{ height: "100%" }} />}
//               containerElement={<View style={{ height: "100vh" }} />}
//               mapElement={<View style={{ height: "100%" }} />}
//               locations={locations}
//             />
//           </View>
//         </View>
//       )}
//       <View style={{ height: 200 }}></View>
//     </View>
//   );
// };

// export default MapTry;
