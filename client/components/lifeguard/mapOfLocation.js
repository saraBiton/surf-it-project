import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { start_ws_client } from './ws-client';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
// import { getClosestPoint } from './distanceApp';
function MarkerMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ',
  });

  const containerStyle = {
    width: '70%',
    height: 600,
  };

  const center = {
    lat: 31.791001,
    lng: 34.626314,
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapView}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}>
              <Markers />
            </GoogleMap>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>
    </View>
  );

  function Markers() {

    const icons = {
      OK: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      ALERT: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
      SOS: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    };

    const [markers, setMarkers] = useState([]);

    start_ws_client((sensor_list) => {
      setMarkers(sensor_list);

      sensor_list.forEach(sensor => {
        if (sensor.status === "SOS") {

        }

      });
    });

    return (
      <React.Fragment>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={icons[marker.status]}
          />
        ))}
      </React.Fragment>
    );
  }
}


// function MarkerMap() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ',
//   });

//   const containerStyle = {
//     width: '70%',
//     height: 600,
//   };

//   const center = {
//     lat: 31.791001,
//     lng: 34.626314,
//   };

//   const [markers, setMarkers] = useState([]);
//   const [directions, setDirections] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const { point, route } = await getClosestPoint(markers, center);
//       setMarkers(markers);
//       setDirections(route);
//     }
//     fetchData();
//   }, [markers]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.mapContainer}>
//         <View style={styles.mapView}>
//           {isLoaded ? (
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={center}
//               zoom={16}>
//               <Markers />
//               {directions && (
//                 <DirectionsService
//                   options={{
//                     destination: directions.legs[0].end_location,
//                     origin: directions.legs[0].start_location,
//                     waypoints: directions.waypoint_order.map((index) => ({
//                       location: directions.legs[index + 1].end_location,
//                     })),
//                     travelMode: 'DRIVING',
//                   }}
//                   callback={(result) => {
//                     if (result !== null) {
//                       setDirections(result);
//                     }
//                   }}
//                 />
//               )}
//               {directions && (
//                 <DirectionsRenderer
//                   options={{
//                     directions,
//                     suppressMarkers: true,
//                     polylineOptions: {
//                       strokeColor: '#0000ff',
//                       strokeOpacity: 0.5,
//                       strokeWeight: 5,
//                     },
//                   }}
//                 />
//               )}
//             </GoogleMap>
//           ) : (
//             <Text>Loading...</Text>
//           )}
//         </View>
//       </View>
//     </View>
//   );

//   function Markers() {
//     const icons = {
//       OK: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
//       ALERT: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
//       SOS: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
//     };

//     return (
//       <React.Fragment>
//         {markers.map((marker) => (
//           <Marker
//             key={marker.id}
//             position={marker.position}
//             icon={icons[marker.status]}
//           />
//         ))}
//       </React.Fragment>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    width: '100%',
    height: '80%',
    marginTop: 20,
  },
});
export default MarkerMap;
