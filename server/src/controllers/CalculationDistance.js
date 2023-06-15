// מקבלת מקור ויעדים ומחזירה את המרחק בין המקור לכל יעד
// באמצעות שימוש ב-API של Google Maps
// המרחקים מוחזרים בפורמט JSON.

import axios from "axios";
import { User } from "../Models/userModel.js";
import { Defibrillator } from "../Models/defibrillatorModel.js";

const a = getActiveVolunteersDistances({
  lat: 31.790969999999998,
  lng: 34.626059,
});
//1
// async function getDistance(origin, destinations) {
//   const apiKey = "AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ";
//   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=`;

//   destinations.forEach((destination) => {
//     url += `${destination.lat},${destination.lng}|`;
//   });

//   url += `&key=${apiKey}`;
//   axios
//     .get(url)
//     .then((response) => {
//       const data = response.data;
//       const rows = data.rows[0].elements;

//       rows.forEach((element, index) => {
//         const destination = destinations[index];
//         const travelTime = element.duration.text;
//         console.log(
//           `Travel time from origin to destination (${destination.lat},${destination.lng}): ${travelTime}`
//         );
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
//2
// export async function getDistance(origin, destinations) {
//   try {
//     const apiKey = "your_api_key_here";
//     const destinationsString = destinations
//       .map((destination) => `${destination.lat},${destination.lng}`)
//       .join("|");
//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destinationsString}&key=${apiKey}`;

//     console.log(url); // הדפסת הקישור לצורך בדיקה

//     const response = await axios.get(url);
//     const data = response.data;
//     const rows = data.rows[0].elements;

//     const distances = {};
//     rows.forEach((element, index) => {
//       const destination = destinations[index];
//       const distance = element.distance.value;
//       distances[`${destination.lat},${destination.lng}`] = distance;
//     });

const a = getActiveVolunteersDistances({
  lat: 31.790969999999998,
  lng: 34.626059,
});
export async function getDistance(origin, destinations) {
  try {
    const apiKey = "AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ";
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=`;

    destinations.forEach((destination) => {
      url += `${destination.lat},${destination.lng}|`;
    });

    url += `&key=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;
    const rows = data.rows[0].elements;

    const distances = {};
    rows.forEach((element, index) => {
      const destination = destinations[index];
      if (element.distance) {
        const distance = element.distance.value;
        distances[`${destination.lat},${destination.lng}`] = distance;
      } else {
        console.error(
          `Distance not found for destination ${destination.lat},${destination.lng}`
        );
      }
    });

    return distances;
  } catch (error) {
    throw new Error("Failed to get distances from Google Maps API");
  }
}
export async function getActiveVolunteersDistances(point) {
	const volunteers = await getActiveVolunteers();
	const defibrillators = await getInactiveDefibrillators();

	const activeVolunteers = volunteers.map((v) => {
		return { lng: v.volunteer.lng, lat: v.volunteer.lat, id: v.id };
	});

	const defibrillatorsfree = defibrillators.map((d) => {
		return { lng: d.position.lng, lat: d.position.lat, id: d.id };
	});

	const [distancesVolunteers, distancesDefibrillators] = await Promise.all([
		getDistance(point, activeVolunteers),
		getDistance(point, defibrillatorsfree)
	]);

	console.log(activeVolunteers);
	console.log(distancesVolunteers);
	console.log(defibrillatorsfree);
	console.log(distancesDefibrillators);
}

async function getActiveVolunteers() {
	const volunteers = await User.find({
		role: 'volunteer',
		'volunteer.isActive': true
	}).maxTimeMS(600000);
	return volunteers;
}

async function getInactiveDefibrillators() {
	const defibrillators = await Defibrillator.find({
		isActive: false
	}).maxTimeMS(600000);
	return defibrillators;
}
// export async function getActiveVolunteersDistances(point){
// 	const volunteers = await User.find({ role: 'volunteer' }).maxTimeMS(600000);// זמן מקסימלי של דקה (60,000 מילישניות)

//   const activeVolunteers = volunteers
//     .filter((v) => v.volunteer.isActive === true)
//     .map((v) => {
//       return { lng: v.volunteer.lng, lat: v.volunteer.lat, id: v.id };
//     });
//   console.log(activeVolunteers);

//   const distancesVolunteers = await getDistance(point, activeVolunteers);

// 	console.log(distancesVolunteers);

//   const defibrillators = await Defibrillator.find().maxTimeMS(600000);;

//   const defibrillatorsfree = defibrillators
//     .filter((d) => d.isActive === false)
//     .map((d) => {
//       return { lng: d.position.lng, lat: d.position.lat, id:d.id };
//     });
//   console.log(defibrillatorsfree);

//   const distancesDefibrillators = await getDistance(point, defibrillatorsfree);

//   console.log(distancesDefibrillators);

// 	// const result = dijkstra(
// 	// 	graph,
// 	// 	point,
// 	// 	distances[0].destination,
// 	// 	'defibrillator2'
// 	// );

// 	// console.log(result.path);
// 	// console.log(result.distance);
// };
