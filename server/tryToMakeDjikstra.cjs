//   // Define the graph
//   const graph = {
//     drowning: [
//       { name: 'defib1', weight: 1 },
//       { name: 'defib2', weight: 2 },
//       // Add more defibrillators if needed
//     ],
//     defib1: [
//       { name: 'volunteer1', weight: 3 },
//       { name: 'volunteer2', weight: 4 },
//       // Add more volunteers if needed
//     ],
//     defib2: [
//       { name: 'volunteer1', weight: 5 },
//       { name: 'volunteer2', weight: 6 },
//       // Add more volunteers if needed
//     ],
//     // Add more vertices if needed
//   };
  
// // Implementation of Dijkstra's algorithm
// function findShortestPath(graph, startVertex, endVertex) {
//     const distances = {};
//     const previousVertices = {};
//     const visited = {};
  
//     // Initialize distances and previousVertices
//     for (const vertex in graph) {
//       distances[vertex] = Infinity;
//       previousVertices[vertex] = null;
//     }
  
//     distances[startVertex] = 0;
  
//     while (true) {
//       let closestVertex = null;
//       let shortestDistance = Infinity;
  
//       // Find the closest unvisited vertex
//       for (const vertex in graph) {
//         if (!visited[vertex] && distances[vertex] < shortestDistance) {
//           closestVertex = vertex;
//           shortestDistance = distances[vertex];
//         }
//       }
  
//       if (closestVertex === null) break;
  
//       visited[closestVertex] = true;
  
//       const neighbors = graph[closestVertex];
  
//       // Update distances to neighbors
//       for (const neighbor of neighbors) {
//         const distance = neighbor.weight;
//         if (distance < distances[neighbor.name]) {
//           distances[neighbor.name] = distance;
//           previousVertices[neighbor.name] = closestVertex;
//         }
//       }
//     }
  
//     // Build the shortest path
//     const path = [];
//     let currentVertex = endVertex;
  
//     while (currentVertex !== null) {
//       path.unshift(currentVertex);
//       currentVertex = previousVertices[currentVertex];
//     }
  
//     return path;
//   }
  

//   // Call the function to find the shortest path from drowning to the nearest volunteer
//   const startVertex = 'drowning';
//   const endVertex = 'volunteer1'; // Replace with the desired volunteer
//   const shortestPath = findShortestPath(graph, startVertex, endVertex);
  
//   console.log(`Shortest path from ${startVertex} to ${endVertex}:`, shortestPath);
  
  
//=====================================================================================================================================


// // Define the graph as an object with nodes as keys and their neighbors as values
// const graph = {
//     drowningPerson: {
//       defibrillator1: 2000,
//       defibrillator2: 1500
//     },
//     volunteer1: {
//       defibrillator1: 500,
//       defibrillator2: 1500
//     },
//     volunteer2: {
//       defibrillator1: 1000,
//       defibrillator2: 500
//     },
//     defibrillator1: {
//       drowningPerson: 2000,
//       volunteer1: 500,
//       volunteer2: 1000,
//       defibrillator2: 500
//     },
//     defibrillator2: {
//       drowningPerson: 1500,
//       volunteer1: 1500,
//       volunteer2: 500,
//       defibrillator1: 500
//     }
//   };
  
//   // Define the locations of the drowning person, volunteers, and defibrillators
//   const locations = {
//     drowningPerson: {
//       lat: 40.7128,
//       lon: -74.0060
//     },
//     volunteer1: {
//       lat: 40.7129,
//       lon: -74.0059
//     },
//     volunteer2: {
//       lat: 40.7130,
//       lon: -74.0058
//     },
//     defibrillator1: {
//       lat: 40.7127,
//       lon: -74.0061
//     },
//     defibrillator2: {
//       lat: 40.7126,
//       lon: -74.0062
//     }
//   };
  
//   // Define the distance function using the Haversine formula
//   function distance(lat1, lon1, lat2, lon2) {
//     const R = 6371e3; // Earth's radius in meters
//     const φ1 = lat1 * Math.PI / 180; // Convert latitudes to radians
//     const φ2 = lat2 * Math.PI / 180;
//     const Δφ = (lat2 - lat1) * Math.PI / 180;
//     const Δλ = (lon2 - lon1) * Math.PI / 180;
  
//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) *
//       Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
//     return R * c;
//   }
  
//   // Convert the weights of the edges to distances in meters
//   Object.keys(graph).forEach(node => {
//     Object.keys(graph[node]).forEach(neighbor => {
//       const weight = graph[node][neighbor];
//       const dist = distance(locations[node].lat, locations[node].lon, locations[neighbor].lat, locations[neighbor].lon);
//       graph[node][neighbor] = dist;
//     });
//   });
  
//   // Define the Dijkstra's algorithm function
//   function dijkstra(graph, startNode) {
//     const distances = {};
//     const visited = {};
//     const previous = {};
//     const queue = [];
  
//     // Initialize distances and previous nodes
//     Object.keys(graph).forEach(node => {
//       distances[node] = Infinity;
//       previous[node] = null;
//       queue.push(node);
//     });
//     distances[startNode] = 0;
  
//     // Main loop
//     while (queue.length > 0) {
//       // Find the node with the smallest distance
//       let smallestNode = null;
//       queue.forEach(node => {
//         if (smallestNode === null || distances[node] < distances[smallestNode]) {
//           smallestNode = node;
//         }
//       });
  
//       // Update distances to neighbors
//       Object.keys(graph[smallestNode]).forEach(neighbor => {
//         const distance = distances[smallestNode] + graph[smallestNode][neighbor];
//         if (distance < distances[neighbor]) {
//           distances[neighbor] = distance;
//           previous[neighbor] = smallestNode;
//         }
//       });
  
//       // Mark the node as visited and remove it from the queue
//       visited[smallestNode] = true;
//       queue.splice(queue.indexOf(smallestNode), 1);
//     }
  
//     return previous;
//   }
  
//   // Find the shortest path from the drowning person to a volunteer through a defibrillator
//   const previous = dijkstra(graph, 'drowningPerson');
//   let current = 'volunteer1';
//   const path = ['volunteer1'];
//   while (current !== 'drowningPerson') {
//     path.unshift(previous[current]);
//     current = previous[current];
//   }
  
//   // Print the shortest path to a volunteer through a defibrillator
//   console.log(`The shortest path to a volunteer through a defibrillator is ${path.join(' -> ')}.`);// Define the graph as an object with nodes as keys and their neighbors as values

//==================================================================================================================
//=================================================================================================================
// // Define the graph as an object with nodes as keys and their neighbors as values
// const graph = {
//     drowningPerson: {
//       defibrillator1: 2000,
//       defibrillator2: 1500
//     },
//     volunteer1: {
//       defibrillator1: 500,
//       defibrillator2: 1500
//     },
//     volunteer2: {
//       defibrillator1: 1000,
//       defibrillator2: 500
//     },
//     defibrillator1: {
//       drowningPerson: 2000,
//       volunteer1: 500,
//       volunteer2: 1000,
//       defibrillator2: 500
//     },
//     defibrillator2: {
//       drowningPerson: 1500,
//       volunteer1: 1500,
//       volunteer2: 500,
//       defibrillator1: 500
//     }
//   };
  
//   // Define the locations of the drowning person, volunteers, and defibrillators
//   const locations = {
//     drowningPerson: {
//       lat: 40.7128,
//       lon: -74.0060
//     },
//     volunteer1: {
//       lat: 40.7129,
//       lon: -74.0059
//     },
//     volunteer2: {
//       lat: 40.7130,
//       lon: -74.0058
//     },
//     defibrillator1: {
//       lat: 40.7127,
//       lon: -74.0061
//     },
//     defibrillator2: {
//       lat: 40.7126,
//       lon: -74.0062
//     }
//   };
  
//   // Define the distance function using the Haversine formula
//   function distance(lat1, lon1, lat2, lon2) {
//     const R = 6371e3; // Earth's radius in meters
//     const φ1 = lat1 * Math.PI / 180; // Convert latitudes to radians
//     const φ2 = lat2 * Math.PI / 180;
//     const Δφ = (lat2 - lat1) * Math.PI / 180;
//     const Δλ = (lon2 - lon1) * Math.PI / 180;
  
//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) *
//       Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
//     return R * c;
//   }
  
//   // Convert the weights of the edges to distances in meters
//   Object.keys(graph).forEach(node => {
//     Object.keys(graph[node]).forEach(neighbor => {
//       const dist = distance(locations[node].lat, locations[node].lon, locations[neighbor].lat, locations[neighbor].lon);
//       graph[node][neighbor] = dist;
//     });
//   });
  
//   // Define the Dijkstra's algorithm function
//   function dijkstra(graph, startNode) {
//     const distances = {};
//     const visited = {};
//     const previous = {};
//     const queue = [];
  
//     // Initialize distances and previous nodes
//     Object.keys(graph).forEach(node => {
//       distances[node] = Infinity;
//       previous[node] = null;
//       queue.push(node);
//     });
//     distances[startNode] = 0;
  
//     // Main loop
//     while (queue.length > 0) {
//       // Find the node with the smallest distance
//       let smallestNode = null;
//       queue.forEach(node => {
//         if (smallestNode === null || distances[node] < distances[smallestNode]) {
//           smallestNode = node;
//         }
//       });
  
//       // Update distances to neighbors
//       Object.keys(graph[smallestNode]).forEach(neighbor => {
//         const distance = distances[smallestNode] + graph[smallestNode][neighbor];
//         if (distance < distances[neighbor]) {
//           distances[neighbor] = distance;
//           previous[neighbor] = smallestNode;
//         }
//       });
  
//       // Mark the node as visited and remove it from the queue
//       visited[smallestNode] = true;
//       queue.splice(queue.indexOf(smallestNode), 1);
//     }
  
//     return previous;
//   }
  
//   // Find the shortest path from the drowning person to a volunteer through a defibrillator
//   const previous = dijkstra(graph, 'drowningPerson');
//   let current = 'volunteer1';
//   const path = ['volunteer1'];
//   while (current !== 'drowningPerson') {
//     path.unshift(previous[current]);
//     current = previous[current];
//   }
  
//   // Print the shortest path to a volunteer through a defibrillator
//   console.log(`The shortest path to a volunteer through a defibrillator is ${path.join(' -> ')}.`);
const PriorityQueue = require('./priorityQueue'); // import priority queue data structure

// define graph
const graph = {
  drowning: { defibrillator1: 1, defibrillator2: 3 },
  defibrillator1: { volunteer1: 1, volunteer2: 2 },
  defibrillator2: { volunteer1: 1, volunteer2: 1 },
  volunteer1: {},
  volunteer2: {}
};

// define function to find shortest path
function dijkstra(graph, source, target) {
  const distances = {}; // distances from source to each vertex
  const previous = {}; // previous vertex in shortest path
  const queue = new PriorityQueue(); // priority queue to store vertices to visit

  // initialize distances and previous vertices
  for (let vertex in graph) {
    if (vertex === source) {
      distances[vertex] = 0;
      queue.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      queue.enqueue(vertex, Infinity);
    }
    previous[vertex] = null;
  }

  // visit vertices in priority order
  while (!queue.isEmpty()) {
    const currentVertex = queue.dequeue();

    // stop if target vertex is reached
    if (currentVertex === target) {
      break;
    }

    // update distances and previous vertices for neighboring vertices
    for (let neighbor in graph[currentVertex]) {
      const distance = graph[currentVertex][neighbor];
      const totalDistance = distances[currentVertex] + distance;

      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previous[neighbor] = currentVertex;
        queue.changePriority(neighbor, totalDistance);
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

// find shortest path from drowning to nearest volunteer
const result = dijkstra(graph, 'drowning', 'volunteer1');
console.log(result.path); // output: ['drowning', 'defibrillator1', 'volunteer1']
console.log(result.distance); // output: 2