// מקבלת מקור ויעדים ומחזירה את המרחק בין המקור לכל יעד
// באמצעות שימוש ב-API של Google Maps
// המרחקים מוחזרים בפורמט JSON.

import axios from "axios";
import { User } from "../Models/userModel.js";
import { Defibrillator } from "../Models/defibrillatorModel.js";
import { apiKey } from "../Config/db.js";
import { findShortestPath } from "../controllers/dijkstraGraph.js";

// רשימת יעדים ומקורות זהה בשתי הקריאות
// !!סדר הפרמטרים לא משתנה בין הקריאות
// פעם ראשונה: יעד - חיישן. מקור - דפיברילטורים
// פעם שנייה: יעד - דפיברילטורים. מקור: מתנדבים
export async function getDistance(destinations, origins) {
  try {
    if (
      !origins ||
      !destinations ||
      (!origins?.lat && !origins[0]?.lat) ||
      (!destinations?.lat && !destinations[0]?.lat)
    ) {
      return false;
    }

    if (!Array.isArray(destinations)) {
      destinations = [destinations];
    }

    // בקשת נתונים מגוגל מפות
    const data = await googleGetDistance(destinations, origins);
    // const elements = isDestination ? data.rows[0]?.elements : data.rows;
    return data;
    // // עיבוד נתונים
    // const sortOriginsElements = processingData(data);

    // console.log(sortOriginsElements);

    // return sortOriginsElements;
  } catch (error) {
    error.message += "\r\n" + "Failed to get distances from Google Maps API";
    throw error;
  }

  function processingData(data) {
    // רשימת כתובות מקור
    const origin_addresses = data.origin_addresses;

    // כל השורות של elements
    const rows = data.rows;

    // הוספת שורות המקור לרשימת מקורות ויעדים
    const originsElements = rows.map((origin, i) => {
      origin.src = origins[i];
      origin.address = origin_addresses[i];

      origin.elements = origin.elements.map((destination, j) => {
        destination.src = destinations[j];
        return destination;
      });

      // מיון יעדים
      origin.elements = origin.elements.sort(
        (a, b) => a?.distance?.value - b?.distance?.value
      );

      return origin;
    });

    // מיון מקורות
    const sortOriginsElements = originsElements.sort(
      (a, b) => a.elements[0]?.distance?.value - b.elements[0]?.distance?.value
    );

    return sortOriginsElements;
  }

  async function googleGetDistance(destinations, origins) {
    destinations = arrayToPipeString(destinations);
    origins = arrayToPipeString(origins);

    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          key: apiKey,
          destinations,
          origins,
        },
      }
    );

    return response;
  }
}

export async function getActiveVolunteersDistances(
  sensorPosition
  // sensorPosition = { lat: 31.792, lng: 34.627 }
) {
  console.log("point:", sensorPosition);
  const volunteers = await getActiveVolunteers();
  const defibrillators = await getInactiveDefibrillators();

  const getRelevantInformation = (obj, position) => ({
    lng: position.lng,
    lat: position.lat,
    id: obj.id,
    _id: obj._id,
  });

  const activeVolunteers = volunteers.map((user) =>
    getRelevantInformation(user, user.volunteer)
  );

  const defibrillatorsfree = defibrillators.map((defibrilator) =>
    getRelevantInformation(defibrilator, defibrilator.position)
  );

  const promiseArray = [];
  promiseArray.push(getDistance(sensorPosition.position, defibrillatorsfree));

  promiseArray.push(getDistance(defibrillatorsfree, activeVolunteers, false));

  const [distancesDefibrillators, distancesVolunteers] = await Promise.all(
    promiseArray
  ).catch((error) => console.error(error));
  const graph = await createGraph(
    sensorPosition,
    defibrillatorsfree,
    activeVolunteers,
    distancesDefibrillators,
    distancesVolunteers
  );
  let vol = [];
  for (let index = 0; index < graph.length; index++) {
    if (graph[index].type == "volunteer") vol.push(graph[index]);
  }
  await findShortestPath(graph, graph[0], vol);
}
async function createGraph(
  sensor,
  defibrilators,
  volunteers,
  distanceSensorDefibrilator,
  distanceDefibrilatorVolunteer
) {
  const graph = [];
  graph.push({
    id: sensor.id,
    type: "sensor",
    location: sensor.position,
    Neighbors: [],
  });
  for (let index = 0; index < defibrilators.length; index++) {
    graph.push({
      id: defibrilators[index].id,
      type: "defibrilator",
      location: {
        lat: defibrilators[index].lat,
        lng: defibrilators[index].lng,
      },
      Neighbors: [],
    });
  }
  for (let index = 0; index < volunteers.length; index++) {
    graph.push({
      id: volunteers[index].id,
      type: "volunteer",
      location: { lat: volunteers[index].lat, lng: volunteers[index].lng },
      Neighbors: [],
    });
  }
  return addNeighbors(
    graph,
    defibrilators,
    distanceSensorDefibrilator,
    distanceDefibrilatorVolunteer
  );
}
async function addNeighbors(
  graph,
  defibrilators,
  distanceSensorDefibrilator,
  distanceDefibrilatorVolunteer
) {
  for (
    let index = 0;
    index < distanceSensorDefibrilator.data.rows.length;
    index++
  ) {
    graph[0].Neighbors.push({
      id: defibrilators[index].id,
      distance:
        distanceSensorDefibrilator.data.rows[index].elements[0].distance.value,
    });
  }
  for (let index = 0; index < graph.length; index++) {
    if (graph[index].type == "defibrilator") {
      //כל שורה זה מתנדב וכל האלמנטים בכל שורה זה דפיברילטור שמקביל למערך הדפיברילטורים
      for (let j = 0; j < distanceDefibrilatorVolunteer.data.rows.length; j++) {
        for (
          let k = 0;k < distanceDefibrilatorVolunteer.data.rows[j].elements.length;k++) {
          if (defibrilators[k].id == graph[index].id)
            graph[index].Neighbors.push({
              id: defibrilators[j].id,
              distance:
                distanceDefibrilatorVolunteer.data.rows[j].elements[k].distance
                  .value,
            });
        }
      }
    }
  }
  return graph;
}

async function getActiveVolunteers() {
  const volunteers = await User.find({
    role: "volunteer",
    "volunteer.isActive": true,
    "volunteer.lat": { $ne: null },
    "volunteer.lng": { $ne: null },
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

const arrayToPipeString = (param) => {
  if (Array.isArray(param)) {
    return param.map((target) => `${target.lat},${target.lng}`).join("|");
  } else if (typeof param === "object") {
    return `${param.lat},${param.lng}`;
  } else {
    throw new Error("param is not validate!");
  }
};
