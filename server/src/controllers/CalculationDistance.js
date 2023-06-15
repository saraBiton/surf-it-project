// מקבלת מקור ויעדים ומחזירה את המרחק בין המקור לכל יעד
// באמצעות שימוש ב-API של Google Maps
// המרחקים מוחזרים בפורמט JSON.

import axios from "axios";
import { User } from "../Models/userModel.js";
import { Defibrillator } from "../Models/defibrillatorModel.js";

const apiKey = "AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ";

//isDestination = true ,(מערך מקורות, יעד)
//isDestination = false ,(מערך יעדים, מערך מקורות)
export async function getDistance(
  targetOrSources,
  sourcesOrTargets,
  isDestination = true
) {
  try {
    if (
      !targetOrSources ||
      !targetOrSources[0]?.lat ||
      !sourcesOrTargets ||
      !sourcesOrTargets[0]?.lat
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

    const data = response.data;
    const elements = isDestination ? data.rows[0]?.elements : data.rows;

    const distances = {};
    elements.forEach((element, index) => {
      if (element.distance) {
        const coord = isDestination ? sourcesOrTargets[index] : targetOrSources;
        const distance = element?.distance.value;
        distances[`${coord.lat},${coord.lng}`] = distance;
      } else {
        console.error(
          `Distance not found for ${
            isDestination ? "source" : "target"
          } ${index}`
        );
      }
    });
    return distances;
  } catch (error) {
    error.message += "\r\n" + "Failed to get distances from Google Maps API";
    throw error;
  }
}

export async function getActiveVolunteersDistances(
  point = { lat: 31.792, lng: 34.627 }
) {
  console.log("point:", point);
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
    getDistance(activeVolunteers, defibrillatorsfree, false),
  ]).catch((error) => console.error(error));

  console.log("activeVolunteers:", activeVolunteers);
  console.log("distancesVolunteers:", distancesVolunteers);
  console.log("defibrillatorsfree:", defibrillatorsfree);
  console.log("distancesDefibrillators:", distancesDefibrillators);
}

async function getActiveVolunteers() {
  const volunteers = await User.find({
    role: "volunteer",
    "volunteer.isActive": true,
  }).maxTimeMS(600000);
  console.log(`Found ${volunteers.length} active volunteers`);
  console.log(volunteers);
  return volunteers;
}

async function getInactiveDefibrillators() {
  const defibrillators = await Defibrillator.find({
    isActive: false,
  }).maxTimeMS(600000);
  console.log(`Found ${defibrillators.length} active defibrillators`);
  console.log(defibrillators);
  return defibrillators;
}

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

//2
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
