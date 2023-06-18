// מקבלת מקור ויעדים ומחזירה את המרחק בין המקור לכל יעד
// באמצעות שימוש ב-API של Google Maps
// המרחקים מוחזרים בפורמט JSON.

import axios from 'axios';
import { User } from '../Models/userModel.js';
import { Defibrillator } from '../Models/defibrillatorModel.js';
import { apiKey } from '../Config/db.js';

// isDestination = true ,(מערך מקורות, יעד) <- לא עדכני
// isDestination = false ,(מערך יעדים, מערך מקורות) <- לא עדכני

// רשימת יעדים ומקורות זהה בשתי הקריאות
// !!סדר הפרמטרים לא משתנה בין הקריאות
// פעם ראשונה: יעד - חיישן. מקור - דפיברילטורים
// פעם שנייה: יעד - דפיברילטורים. מקור: מתנדבים
export async function getDistance (
	destinations,
	origins
	// isDestination = true
) {
	try {
		if (
			!origins || !destinations ||
			(
				!origins?.lat &&
				!origins[0]?.lat
			) || (
				!destinations?.lat &&
				!destinations[0]?.lat
			)
		) {
			return false;
		}

    let origins, destinations;
    if (isDestination) {
      origins = sourcesOrTargets
        .map((source) => `${source.lat},${source.lng}`)
        .join("|");
      destinations = `${targetOrSources.lat},${targetOrSources.lng}`;
    } else {
      origins = `${targetOrSources.lat},${targetOrSources.lng}`;
      destinations = sourcesOrTargets
        .map((target) => `${target.lat},${target.lng}`)
        .join("|");
    }
console.log("origins:",origins);
console.log("destinations:",destinations);
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          key: apiKey,
          origins: origins,
          destinations: destinations,
        },
      }
    );

		return response.data;
	};
}

function graph (originsList) {
	const distances = {};
	const distances1 = {}; // for exemple
	originsList.forEach((element, index) => {
		const origin = element.src;

		if (element.elements[0].status === 'OK') {
			distances[`${origin.lat},${origin.lng}`] = element.elements[0].distance.value;

			distances1[element.src._id] = element.elements[0].distance.value;
		}

		/* if (element.distance) {
			const coord = isDestination ? destinations[index] : origins;
			const distance = element?.distance.value;
			distances[`${coord.lat},${coord.lng}`] = distance;
		} else {
			console.error(
				`Distance not found for ${isDestination ? 'source' : 'target'
				} ${index}`
			);
		} */
	});
	return distances;
}

export async function getActiveVolunteersDistances (
	sensorPosition = { lat: 31.792, lng: 34.627 }
) {
	console.log('point:', sensorPosition);
	const volunteers = await getActiveVolunteers();
	const defibrillators = await getInactiveDefibrillators();

	const getRelevantInformation = (obj, position) =>
		({ lng: position.lng, lat: position.lat, id: obj.id, _id: obj._id });

	const activeVolunteers =
		volunteers.map((user) => getRelevantInformation(user, user.volunteer));

	const defibrillatorsfree =
		defibrillators.map((defibrilator) =>
			getRelevantInformation(defibrilator, defibrilator.position));

	const promiseArray = [];
	promiseArray.push(
		getDistance(sensorPosition, defibrillatorsfree)
	);

	promiseArray.push(
		getDistance(defibrillatorsfree, activeVolunteers, false)
	);

	const [distancesVolunteers, distancesDefibrillators] = await Promise.all(promiseArray)
		.catch((error) => console.error(error));

	// זאת פונקצית הגרף? איני יודע
	const a = graph(distancesVolunteers);

	const b = graph(distancesDefibrillators);

	console.log(a, b);
	console.log('activeVolunteers:', activeVolunteers);
	console.log('distancesVolunteers:', distancesVolunteers);
	console.log('defibrillatorsfree:', defibrillatorsfree);
	console.log('distancesDefibrillators:', distancesDefibrillators);
}

async function getActiveVolunteers () {
	const volunteers = await User.find({
		role: 'volunteer',
		'volunteer.isActive': true,
		'volunteer.lat': { $ne: null },
		'volunteer.lng': { $ne: null }
	}).maxTimeMS(600000);
	console.log(`Found ${volunteers.length} active volunteers`);
	console.log(volunteers);
	return volunteers;
}

async function getInactiveDefibrillators () {
	const defibrillators = await Defibrillator.find({
		isActive: false
	}).maxTimeMS(600000);
	console.log(`Found ${defibrillators.length} active defibrillators`);
	console.log(defibrillators);
	return defibrillators;
}

const arrayToPipeString = (param) => {
	if (Array.isArray(param)) {
		return param.map((target) => `${target.lat},${target.lng}`)
			.join('|');
	} else if (typeof param === 'object') {
		return `${param.lat},${param.lng}`;
	} else {
		throw new Error('param is not validate!');
	}
};

// export async function getDistance(origin, destinations) {
//   try {
//     if (!origin || !origin.lat || !destinations || !destinations[0]?.lat) {
//       return false;
//     }
//     const response = await axios.get(
//       "https://maps.googleapis.com/maps/api/distancematrix/json",
//       {
//         params: {
//           key: apiKey,
//           origins: `${origin.lat},${origin.lng}`,
//           destinations: destinations
//             .map((destination) => `${destination.lat},${destination.lng}`)
//             .join("|"),
//         },
//       }
//     );

//     const data = response.data;
//     const rows = data.rows[0]?.elements;

//     const distances = {};
//     rows.forEach((element, index) => {
//       if (element.distance) {
//         const destination = destinations[index];
//         const distance = element?.distance.value;
//         distances[`${destination.lat},${destination.lng}`] = distance;
//       } else {
//         console.error(
//           `Distance not found for destination ${destinations[index].lat},${destinations[index].lng}`
//         );
//       }
//     });

//     return distances;
//   } catch (error) {
//     error.message += "\r\n" + "Failed to get distances from Google Maps API";
//     throw error;
//   }
// }

// 2
// export async function getDistance(
//   targetOrSources,
//   sourcesOrTargets,
//   isDestination = true
// ) {
//   try {
//     if (
//       !targetOrSources ||
//       !targetOrSources[0]?.lat ||
//       !sourcesOrTargets ||
//       !sourcesOrTargets[0]?.lat
//     ) {
//       return false;
//     }

//     const origins = isDestination
//       ? sourcesOrTargets
//           .map((source) => `${source.lat},${source.lng}`)
//           .join("|")
//       : `${targetOrSources.lat},${targetOrSources.lng}`;

//     const destinations = isDestination
//       ? `${targetOrSources.lat},${targetOrSources.lng}`
//       : sourcesOrTargets
//           .map((target) => `${target.lat},${target.lng}`)
//           .join("|");
//     console.log("origins:", origins);
//     console.log("destinations:", destinations);

//     const response = await axios.get(
//       "https://maps.googleapis.com/maps/api/distancematrix/json",
//       {
//         params: {
//           key: apiKey,
//           origins: origins,
//           destinations: destinations,
//         },
//       }
//     );

//     const data = response.data;
//     console.log("response.data:", data);
//     const elements = isDestination ? data.rows[0]?.elements : data.rows;

//     const distances = {};
//     elements.forEach((element, index) => {
//       if (element.distance) {
//         const coord = isDestination
//           ? sourcesOrTargets[index]
//           : targetOrSources[index];
//         const distance = element?.distance.value;
//         console.log("distance:", distance);
//         distances[`${coord.lat},${coord.lng}`] = distance;
//       } else {
//         console.error(
//           `Distance not found for ${
//             isDestination ? "source" : "target"
//           } ${index}`
//         );
//       }
//     });
//     console.log("distances:", distances);
//     return distances;
//   } catch (error) {
//     error.message += "\r\n" + "Failed to get distances from Google Maps API";
//     throw error;
//   }
// }
