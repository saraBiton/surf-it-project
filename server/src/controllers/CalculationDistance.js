//מקבלת מקור ויעדים ומחזירה את המרחק בין המקור לכל יעד
//באמצעות שימוש ב-API של Google Maps
//המרחקים מוחזרים בפורמט JSON.

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

import axios from "axios";
import { User } from "../Models/userModel.js";
import { Defibrillator } from "../Models/defibrillatorModel.js";

async function getDistance(origin, destinations) {
  try {
    const apiKey = "YOUR_API_KEY";
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
      const distance = element.distance.value;
      distances[`${destination.lat},${destination.lng}`] = distance;
    });

    return distances;
  } catch (error) {
    throw new Error("Failed to get distances from Google Maps API");
  }
}

const getActiveVolunteersDistances = async (point) => {
  const volunteers = await User.find({ role: "volunteer" });

  const activeVolunteers = volunteers
    .filter((v) => v.volunteer.isActive === true)
    .map((v) => {
      return { lng: v.volunteer.lng, lat: v.volunteer.lat, id };
    });
  console.log(activeVolunteers);

  const distancesVolunteers = await getDistance(point, activeVolunteers);

  console.log(distances);



  const defibrillators = await Defibrillator.find();

  const defibrillatorsfree = defibrillators
    .filter((v) => d.Defibrillator.isActive === false)
    .map((v) => {
      return { lng: d.Defibrillator.lng, lat: d.Defibrillator.lat, id:d.Defibrillator.id };
    });
  console.log(activeVolunteers);

  const distancesDefibrillators = await getDistance(point, defibrillatorsfree);

  console.log(distances);



  const result = dijkstraGraph(
    graph,
    point,
    distancesVolunteers[0].destination,
    "defibrillator2"
  );

  console.log(result.path);
  console.log(result.distance);
};
export default getActiveVolunteersDistances;

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
