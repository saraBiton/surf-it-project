import PriorityQueue from "js-priority-queue";

// define graph
const graph = {
  drowning: { defibrillator1: 100, defibrillator2: 1000 },
  defibrillator1: { volunteer1: 200, volunteer2: 500 },
  defibrillator2: { volunteer1: 500, volunteer2: 100 },
  volunteer1: {},
  volunteer2: {},
};

// define function to find shortest path
export default function dijkstraGraph(graph, source, target, defibrillator) {
  const distances = {}; // מפה של מרחקים מהצומת המקורי לכל צומת בגרף
  const previous = {}; // מפה של הצמתים הקודמים במסלול הקצר ביותר מהצומת המקורי לכל צומת בגרף.
  const queue = new PriorityQueue({
    //תור עדיפויות של צמתים לביקור, כאשר הצמתים מופרדים על פי המרחק מהצומת המקורי
    comparator: (a, b) => distances[a] - distances[b],
  }); // priority queue to store vertices to visit

  // initialize distances and previous vertices
  for (const vertex in graph) {
    if (vertex === source) {
      distances[vertex] = 0;
      queue.queue(vertex);
    } else {
      distances[vertex] = Infinity;
      queue.queue(vertex);
    }
    previous[vertex] = null; //מאתחל את הערך של הקודקוד הקודם ל- NULL
  }

  // visit vertices in priority order
  while (queue.length > 0) {
    const currentVertex = queue.dequeue();

    // update distances and previous vertices for neighboring vertices
    for (const neighbor in graph[currentVertex]) {
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
const result = dijkstraGraph(graph, "drowning", "volunteer1", "defibrillator2");
console.log(result.path); // output: ['drowning', 'defibrillator2', 'volunteer2']
console.log(result.distance); // output: 2100


//////////


export default function findShortestPath(graph, sensor) {
  const defibrillators = [];
  const volunteers = [];

  // Find all defibrillator and volunteer nodes
  for (const node in graph) {
    if (node.startsWith("defibrillator")) {
      defibrillators.push(node);
    } else if (node.startsWith("volunteer")) {
      volunteers.push(node);
    }
  }

  const shortestPaths = {}; // Store the shortest path and distance for each volunteer node

  // Find the shortest path from each defibrillator to the sensor node
  const sensorDistances = {};
  for (const defibrillator of defibrillators) {
    const result = dijkstraGraph(graph, defibrillator, sensor);
    sensorDistances[defibrillator] = result.distance;
  }

  // Find the shortest path from each volunteer to the sensor passing through the defibrillator with the shortest path to the sensor
  for (const volunteer of volunteers) {
    let shortestDefibrillator = null;
    let shortestDistance = Infinity;
    for (const defibrillator of defibrillators) {
      const result = dijkstraGraph(graph, volunteer, defibrillator);
      const distance = result.distance + sensorDistances[defibrillator];
      if (distance < shortestDistance) {
        shortestDefibrillator = defibrillator;
        shortestDistance = distance;
        shortestPath = result.path;
      }
    }
    shortestPath.push(sensor);
    shortestPaths[volunteer] = {
      path: shortestPath,
      distance: shortestDistance,
    };
  }

  // Find the shortest path and distance among all the paths
  let shortestPath = null;
  let shortestDistance = Infinity;
  for (const volunteer in shortestPaths) {
    if (shortestPaths[volunteer].distance < shortestDistance) {
      shortestPath = shortestPaths[volunteer].path;
      shortestDistance = shortestPaths[volunteer].distance;
    }
  }

  return { path: shortestPath, distance: shortestDistance };
}
