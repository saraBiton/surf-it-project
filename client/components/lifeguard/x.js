import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Data,
} from "@react-google-maps/api";
// import { getAll } from "./service";
// import { endPoint } from "./config";

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
    height: "80%",
    marginTop: 20,
  },
});

function GoogleMaps() {
  const containerStyle = {
    width: "70%",
    height: 600,
  };
  const [markers, setMarkers] = useState();

  //המיקום הראשוני
  const [center, setCenter] = useState({
    lat: 31.783473514693445,
    lng: 34.65195130527602,
  });
  const [status, setStatus] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ",
  });
  useEffect(() => {
    const initSensor = async () => {
      const { data: initialMarkers } = await getAll(endPoint + "sensor");
      console.log("marks", initialMarkers);
      setMarkers(initialMarkers);
      console.log("marks", markers);
    };
    initSensor();

    if (map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }

    return () => {};
  }, [map, center]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const onMapLoad = (map) => {
    setMap(map);
  };

  const onMapUnmount = () => {
    setMap(null);
  };

  const onMapClick = (event) => {
    const newMarkers = [...markers];
    newMarkers.push({
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      key: Date.now(),
      icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    });
    console.log("lat=" + event.latLng.lat() + "lng=" + event.latLng.lng());
    setMarkers(newMarkers);
  };
  return (
    <div>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Button title="Get Location" onPress={getLocation} />
          <View style={styles.mapView}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={onMapLoad}
                onUnmount={onMapUnmount}
                onClick={onMapClick}
              >
                {markers.map((marker) => (
                  <Marker
                    key={marker.key}
                    position={marker.position}
                    icon={{
                      url: marker.icon,
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                  />
                ))}
              </GoogleMap>
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </View>
      </View>
    </div>
  );
}
export default GoogleMaps;
