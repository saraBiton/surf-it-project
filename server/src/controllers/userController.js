/**
 * התקשרות עם מסד הנתונים עבור המשתמש
 */

import axios from "axios";
import { User } from "../Models/userModel.js";

const getAllUsers = async () => {
  // מביא רשימת משתמשים כולל סנסורים
  const users = await User.find();
  return users.map((user) => user.dataToShow());
};

const getUserById = async (id) => {
  return await User.findById(id).populate("sensors");
};

const addUser = async (obj) => {
  const user = new User(obj);
  await user.save();
  return user;
};

const updateUser = async (id, obj) => {
  console.log("obj", obj);

  const user = await User.findByIdAndUpdate(id, obj).populate("sensors");
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};
const checkLogin = async (username, password) => {
  console.log(username);
  console.log(password);
  try {
    const user = await User.findOne({ username, password });
    console.log(user);
    if (user) {
      return console.log(user);
    } else {
      return console.error();
    }
  } catch (error) {
    console.error(error);
    return "Internal server error";
  }
};
async function getDistance(origin, destinations) {
  const apiKey = "AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ";
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

const dijkstra = async (point) => {
  const volunteers = await User.find({ role: "volunteer" });

  const activeVolunteers = volunteers
    .filter((v) => v.volunteer.isActive === true)
    .map((v) => {
      return { lng: v.volunteer.lng, lat: v.volunteer.lat };
    });

  console.log(activeVolunteers);

  getDistance(point, activeVolunteers)
    .then((distances) => {
      console.log(distances);
      // כאן תוכל להשתמש במערך המרחקים כדי להכניס אותם לגרף ולהפעיל עליו את אלגוריתם דייקסטרה
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

export default {
  checkLogin,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  dijkstra,
};

// import dijkstra from'dijkstra-shortest-path';
// const distances = [5, 6, 4, 8, 3];

// const graph = new dijkstra.Graph();

// distances.forEach((distance, index) => {
//   graph.addNode(index.toString());
// });

// for (let i = 0; i < distances.length - 1; i++) {
//   graph.addEdge(i.toString(), (i + 1).toString(), distances[i]);
// }

// const shortestPath = graph.shortestPath('0', (distances.length - 1).toString());

// console.log(shortestPath);

// return distances
// ------------------------------------
// const distances = [];

// for (let i = 0; i < locations.length; i++) {
// 	const location = locations[i];

// 	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ`;

// 	try {
// 		const { data } = await axios.get(url);
// 		console.log(data);
// 		const result = data.results[0];
// 		const address = result.formatted_address;

// 		const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${point.lat},${point.lng}&destinations=${address}&key=AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ`;

// 		const distanceResponse = await axios.get(distanceUrl);
// 		const distance = distanceResponse.data.rows[0].elements[0].distance.text;

// 		distances.push(distance);
// 	} catch (error) {
// 		console.error('Error:', error.message);
// 	}
// }

// return distances;
