// מקבלת מקור ויעדים ומחזירה את המרחק בין המקור לכל יעד
// באמצעות שימוש ב-API של Google Maps
// המרחקים מוחזרים בפורמט JSON.

import axios from 'axios';
import { User } from '../Models/userModel.js';
import { Defibrillator } from '../Models/defibrillatorModel.js';

const apiKey = 'AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ';
// const a = {
//   lat: 31.792688999999946,
//   lng: 34.627924000000526,
// };
export async function getDistance (origin, destinations) {
	try {
		if (!origin || !origin.lat || !destinations || !destinations[0]?.lat) {
			return false;
		}
		const response = await axios.get(
			'https://maps.googleapis.com/maps/api/distancematrix/json',
			{
				params: {
					key: apiKey,
					origins: `${origin.lat},${origin.lng}`,
					destinations: destinations
						.map((destination) => `${destination.lat},${destination.lng}`)
						.join('|')
				}
			}
		);

		const data = response.data;
		const rows = data.rows[0]?.elements;

		const distances = {};
		rows.forEach((element, index) => {
			if (element.distance) {
				const destination = destinations[index];
				const distance = element?.distance.value;
				distances[`${destination.lat},${destination.lng}`] = distance;
			} else {
				console.error(
					`Distance not found for destination ${destination.lat},${destination.lng}`
				);
			}
		});

		return distances;
	} catch (error) {
		error.message += '\r\n' + 'Failed to get distances from Google Maps API';
		throw error;
	}
}

export async function getActiveVolunteersDistances (
	point = {
		lat: 31.792,
		lng: 34.627
	}
) {
	const volunteers = await getActiveVolunteers();
	const defibrillators = await getInactiveDefibrillators();

	const activeVolunteers = volunteers.map((v) => {
		return { lng: v.volunteer.lng, lat: v.volunteer.lat, id: v.id };
	});

	const defibrillatorsfree = defibrillators.map((d) => {
		return { lng: d.position.lng, lat: d.position.lat, id: d.id };
	});

	const [distancesVolunteers, distancesDefibrillators] = await Promise.all([
		getDistance(point, defibrillatorsfree),
		getDistance(defibrillatorsfree, activeVolunteers)
	]).catch((error) => console.error(error));

	console.log(activeVolunteers);
	console.log(distancesVolunteers);
	console.log(defibrillatorsfree);
	console.log(distancesDefibrillators);
}

async function getActiveVolunteers () {
	const volunteers = await User.find({
		role: 'volunteer',
		'volunteer.isActive': true
	}).maxTimeMS(600000);
	return volunteers;
}

async function getInactiveDefibrillators () {
	const defibrillators = await Defibrillator.find({
		isActive: false
	}).maxTimeMS(600000);
	return defibrillators;
}
