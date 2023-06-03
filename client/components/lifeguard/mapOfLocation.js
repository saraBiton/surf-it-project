import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { start_ws_client } from './ws-client';

// import { getClosestPoint } from './distanceApp';

function MarkerMap () {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ'
	});

	const containerStyle = {
		width: '100%',
		height: '100%'
	};

	const center = {
		lat: 31.791001,
		lng: 34.626314
	};

	return (
		<View style={styles.container}>
			<View style={styles.mapContainer}>
				<View style={styles.mapView}>
					{isLoaded
						? (
							<GoogleMap
								mapContainerStyle={containerStyle}
								center={center}
								zoom={16}>
								<Markers />
							</GoogleMap>
						)
						: (
							<Text>Loading...</Text>
						)}
				</View>
			</View>
		</View>
	);

	function Markers ({ }) {
		const [markers, setMarkers] = useState([]);

		start_ws_client((sensor_list) => {
			setMarkers(sensor_list);
		});

		const icons = {
			OK: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
			ALERT: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
			SOS: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
		};

		return (
			<React.Fragment>
				{markers.map((marker) => (
					<Marker
						key={marker._id}
						position={marker.position}
						icon={icons[marker.status]}
					/>
				))}
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	mapContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mapView: {
		width: '100%',
		height: '100%'
		/* marginTop: 20, */
	}
});
export default MarkerMap;
