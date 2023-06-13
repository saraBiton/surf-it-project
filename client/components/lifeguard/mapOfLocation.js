import React, { useState, Fragment } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Alert from "@mui/material/Alert";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { start_ws_client } from "./ws-client";

function MarkerMap({ navigation }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ",
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 31.791001,
    lng: 34.626314,
  };

  try {
    return (
      <View style={styles.container}>
        {/* <Alert.alert('This is a warning alert — check it out!)> */}
        <View style={styles.mapContainer}>
          <View style={styles.mapView}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
              >
                <Markers navigation={navigation} />
              </GoogleMap>
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </View>
      </View>
    );
  } catch (error) {
    console.error(error);
  }

  function Markers({ navigation }) {
    const [markers, setMarkers] = useState([]);

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
    };

    start_ws_client((sensor_list) => {
      setMarkers(sensor_list);
    });

    const icons = {
      OK: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      ALERT: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
      SOS: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    };

    return (
      <Fragment>
        {markers.map((marker) => (
          <Marker
            key={marker._id}
            position={marker.position}
            icon={icons[marker.status]}
            onClick={() => {
              handleActiveMarker(marker._id);
            }}
          >
            {activeMarker === marker._id ? (
              <InfoWindow
                position={marker.position}
                onCloseClick={() => {
                  setActiveMarker(null);
                }}
              >
                <h3>
                  {`Name: ${marker.userId.firstName} ${marker.userId.lastName}`}
                  <br />
                  {`City: ${marker.userId.city}`}
                </h3>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mapView: {
    width: "100%",
    height: "100%",
    /* marginTop: 20, */
  },
});
export default MarkerMap;
