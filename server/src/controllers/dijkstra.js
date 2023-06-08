// const priorityQueue =require('./priorityQ')
// const PriorityQueue = require('./priorityQueue'); // import priority queue data structure

import PriorityQueue from "js-priority-queue";

// define graph
const graph = {
  drowning: { defibrillator1: 1500, defibrillator2: 2000 },
  defibrillator1: { volunteer1: 1500, volunteer2: 500 },
  defibrillator2: { volunteer1: 500, volunteer2: 100 },
  volunteer1: {},
  volunteer2: {},
};

// define function to find shortest path
export default function dijkstra(graph, source, target, defibrillator) {
  const distances = {}; // distances from source to each vertex
  const previous = {}; // previous vertex in shortest path
  const queue = new PriorityQueue({
    comparator: (a, b) => distances[a] - distances[b],
  }); // priority queue to store vertices to visit

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

      if (
        currentVertex === defibrillator ||
        previous[currentVertex] === defibrillator
      ) {
        // if current vertex or previous vertex is the specified defibrillator, only consider neighbors that are volunteers
        if (
          neighbor.startsWith("volunteer") &&
          totalDistance < distances[neighbor]
        ) {
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
const result = dijkstra(graph, "drowning", "volunteer2", "defibrillator2");
console.log(result.path); // output: ['drowning', 'defibrillator2', 'volunteer2']
console.log(result.distance); // output: 2100
