async function getDistance(origin, destinations) {
	const apiKey = 'AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ';
	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=`;

	destinations.forEach((destination) => {
		url += `${destination.lat},${destination.lng}|`;
	});

	url += `&key=${apiKey}`;

	axios
		.get(url)
		.then((response) => {
			const data = response.data;
			const rows = data.rows[0].elements;

			rows.forEach((element, index) => {
				const destination = destinations[index];
				const travelTime = element.duration.text;
				console.log(
					`Travel time from origin to destination (${destination.lat},${destination.lng}): ${travelTime}`
				);
			});
		})
		.catch((error) => {
			console.log(error);
		});
}

// getActiveVolunteersDistances
// const dijkstra = async (point) => {
//   const volunteers = await User.find({ role: "volunteer" });

//   const activeVolunteers = volunteers
//     .filter((v) => v.volunteer.isActive === true)
//     .map((v) => {
//       return { lng: v.volunteer.lng, lat: v.volunteer.lat };
//     });

//   console.log(activeVolunteers);

//   getDistance(point, activeVolunteers)
//     .then((distances) => {
//       console.log(distances);
//       // כאן תוכל להשתמש במערך המרחקים כדי להכניס אותם לגרף ולהפעיל עליו את אלגוריתם דייקסטרה
//     })
//     .catch((error) => {
//       console.error("Error:", error.message);
//     });
// };

const getActiveVolunteersDistances = async (point) => {
	const volunteers = await User.find({ role: 'volunteer' });

	const activeVolunteers = volunteers
		.filter((v) => v.volunteer.isActive === true)
		.map((v) => {
			return { lng: v.volunteer.lng, lat: v.volunteer.lat };
		});

	console.log(activeVolunteers);

	const distances = await getDistance(point, activeVolunteers);

	console.log(distances);

	const result = dijkstra(
		graph,
		point,
		distances[0].destination,
		"defibrillator2"
	);

	console.log(result.path);
	console.log(result.distance);
};
export default getActiveVolunteersDistances;
