/**
 * טעינת כל הראוטרים לאפליקציה
 */

import { app } from "./express.js";
import { sensor_ws_router } from "./routers/ws/sensor-ws.js";
import { client_ws_router } from "./routers/ws/client-ws.js";
import { sensor_router } from "./routers/sensorRouter.js";
import { login_router } from "./routers/loginRouter.js";
import { user_router } from "./routers/userRouter.js";
import sensorController from "./controllers/sensorController.js";

// הפעלת רנדומציית מיקום סנסורים
sensorController.SetRandomCoordinatesForAll();

app.use(sensor_ws_router);
app.use(client_ws_router);
app.use("/users", user_router);
app.use("/sensors", sensor_router);
app.use("/login", login_router);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500);
  res.json({ error_code: err.code, message: err.message });
  console.error(err.stack);
});

export { app };

// const priorityQueue =require('./priorityQ')
// const PriorityQueue = require('./priorityQueue'); // import priority queue data structure

import PriorityQueue from 'js-priority-queue';

// define graph
const graph = {
  drowning: { defibrillator1: 1500, defibrillator2: 2000 },
  defibrillator1: { volunteer1: 1500, volunteer2: 500 },
  defibrillator2: { volunteer1: 500, volunteer2: 100 },
  volunteer1: {},
  volunteer2: {}
};

// define function to find shortest path
function dijkstra(graph, source, target, defibrillator) {
  const distances = {}; // distances from source to each vertex
  const previous = {}; // previous vertex in shortest path
  const queue = new PriorityQueue({ comparator: (a, b) => distances[a] - distances[b] }); // priority queue to store vertices to visit

  // initialize distances and previous vertices
  for (let vertex in graph) {
    if (vertex === source) {
      distances[vertex] = 0;
      queue.queue(vertex);
    } else {
      distances[vertex] = Infinity;
      queue.queue(vertex);
    }
    previous[vertex] = null;
  }

  // visit vertices in priority order
  while (queue.length > 0) {
    const currentVertex = queue.dequeue();

    // update distances and previous vertices for neighboring vertices
    for (let neighbor in graph[currentVertex]) {
      const distance = graph[currentVertex][neighbor];
      const totalDistance = distances[currentVertex] + distance;

      if (currentVertex === defibrillator || previous[currentVertex] === defibrillator) {
        // if current vertex or previous vertex is the specified defibrillator, only consider neighbors that are volunteers
        if (neighbor.startsWith('volunteer') && totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = currentVertex;
          queue.queue(neighbor);
        }
      } else {
        // otherwise consider all neighbors
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = currentVertex;
          queue.queue(neighbor);
        }
      }
    }
  }

  // construct shortest path
  const path = [];
  let currentVertex = target;

  while (currentVertex !== null) {
    path.unshift(currentVertex);
    currentVertex = previous[currentVertex];
  }

  // return shortest path and distance
  return { path, distance: distances[target] };
}

// find shortest path from drowning to nearest volunteer passing through defibrillator2
const result = dijkstra(graph, 'drowning', 'volunteer2', 'defibrillator2');
console.log(result.path); // output: ['drowning', 'defibrillator2', 'volunteer2']
console.log(result.distance); // output: 2100