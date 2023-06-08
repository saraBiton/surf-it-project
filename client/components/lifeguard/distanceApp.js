import react from "react";
const centralPoint = { latitude: 31.791001, longitude: 34.626314 }; // Replace with your central point
const points = [
  { latitude: 31.791001, longitude: 34.626314 },
  { latitude: 31.790001, longitude: 34.626314 },
  { latitude: 31.791001, longitude: 34.627314 },
]; // Replace with your array of points

const { point, route, duration } = await getClosestPoint(points, centralPoint);
console.log(point); // This will log the closest point to the console
console.log(route); // This will log the shortest route data to the console
console.log(duration); // This will log the duration of the shortest route to the console

export async function getClosestPoint(points, centralPoint) {
  const apiKey = "AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ"; // Replace with your Google Maps API key
  const origin = `${centralPoint.latitude},${centralPoint.longitude}`;
  const destinations = points
    .map((point) => `${point.latitude},${point.longitude}`)
    .join("|");
  const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destinations}&key=${apiKey}`;
  const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${
    destinations[0]
  }&waypoints=${destinations.slice(1)}&key=${apiKey}`;

  // Fetch distance matrix data from Google Maps API
  const distanceMatrixResponse = await fetch(distanceMatrixUrl);
  const distanceMatrixData = await distanceMatrixResponse.json();

  // Find the index of the closest point
  const distances = distanceMatrixData.rows[0].elements.map(
    (element) => element.distance.value
  );
  const closestIndex = distances.indexOf(Math.min(...distances));

  // Fetch directions data from Google Maps API
  const directionsResponse = await fetch(directionsUrl);
  const directionsData = await directionsResponse.json();

  // Parse the shortest route and duration data
  const route = directionsData.routes[0];
  const duration = route.legs.reduce(
    (total, leg) => total + leg.duration.value,
    0
  );

  // Return the closest point and shortest route data
  return { point: points[closestIndex], route, duration };
}
