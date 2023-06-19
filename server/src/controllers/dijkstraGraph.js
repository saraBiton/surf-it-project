// import PriorityQueue from 'js-priority-queue';

// // define graph
// const graph = {
//   drowning: { defibrillator1: 100, defibrillator2: 1000 },
//   defibrillator1: { volunteer1: 200, volunteer2: 500 },
//   defibrillator2: { volunteer1: 500, volunteer2: 100 },
//   volunteer1: {},
//   volunteer2: {},
// };

// // define function to find shortest path
// export async function dijkstraGraph(graph, source, target, defibrillator) {
//   const distances = {}; // מפה של מרחקים מהצומת המקורי לכל צומת בגרף
//   const previous = {}; // מפה של הצמתים הקודמים במסלול הקצר ביותר מהצומת המקורי לכל צומת בגרף.
//   const queue = new PriorityQueue({
//     //תור עדיפויות של צמתים לביקור, כאשר הצמתים מופרדים על פי המרחק מהצומת המקורי
//     comparator: (a, b) => distances[a] - distances[b],
//   }); // priority queue to store vertices to visit



// 	// initialize distances and previous vertices
// 	for (const vertex in graph) {
// 		if (vertex === source) {
// 			distances[vertex] = 0;
// 			queue.queue(vertex);
// 		} else {
// 			distances[vertex] = Infinity;
// 			queue.queue(vertex);
// 		}
// 		previous[vertex] = null; // מאתחל את הערך של הקודקוד הקודם ל- NULL
// 	}

// 	// visit vertices in priority order
// 	while (queue.length > 0) {
// 		const currentVertex = queue.dequeue();

// 		// update distances and previous vertices for neighboring vertices
// 		for (const neighbor in graph[currentVertex]) {
// 			const distance = graph[currentVertex][neighbor];
// 			const totalDistance = distances[currentVertex] + distance;

// 			if (
// 				currentVertex === defibrillator ||
// 				previous[currentVertex] === defibrillator
// 			) {
// 				// if current vertex or previous vertex is the specified defibrillator, only consider neighbors that are volunteers
// 				if (
// 					neighbor.startsWith('volunteer') &&
// 					totalDistance < distances[neighbor]
// 				) {
// 					distances[neighbor] = totalDistance;
// 					previous[neighbor] = currentVertex;
// 					queue.queue(neighbor);
// 				}
// 			} else {
// 				// otherwise consider all neighbors
// 				if (totalDistance < distances[neighbor]) {
// 					distances[neighbor] = totalDistance;
// 					previous[neighbor] = currentVertex;
// 					queue.queue(neighbor);
// 				}
// 			}
// 		}
// 	}

// 	// construct shortest path
// 	const path = [];
// 	let currentVertex = target;

// 	while (currentVertex !== null) {
// 		path.unshift(currentVertex);
// 		currentVertex = previous[currentVertex];
// 	}

// 	// return shortest path and distance
// 	return { path, distance: distances[target] };
// }

// // find shortest path from drowning to nearest volunteer passing through defibrillator2
// // const result = dijkstraGraph(graph, "drowning", "volunteer1", "defibrillator2");

// // console.log(result.path); // output: ['drowning', 'defibrillator2', 'volunteer2']
// // console.log(result.distance); // output: 2100


// //////////


// export async function findShortestPath(graph, sensor) {
//   const defibrillators = [];
//   const volunteers = [];

//   // Find all defibrillator and volunteer nodes
//   // for (const node in graph) {
//   //   if (node.startsWith("defibrillator")) {
//   //     defibrillators.push(node);
//   //   } else if (node.startsWith("volunteer")) {
//   //     volunteers.push(node);
//   //   }
//   // }
//   for (let index = 0; index < graph.length; index++) {
//     if(graph[index].type=="defibrilator")
//     defibrillators.push(graph[index]);
//     else if(graph[index].type=="volunteer")
//     volunteers.push(graph[index]);
//   }

//   const shortestPaths = {}; // Store the shortest path and distance for each volunteer node

//   // Find the shortest path from each defibrillator to the sensor node
//   const sensorDistances = {};
//   for (const defibrillator of defibrillators) {
//     const result =await dijkstraGraph(graph, defibrillator, sensor);
//     sensorDistances[defibrillator] = result.distance;
//   }

//   // Find the shortest path from each volunteer to the sensor passing through the defibrillator with the shortest path to the sensor
//   for (const volunteer of volunteers) {
//     let shortestDefibrillator = null;
//     let shortestDistance = Infinity;
//     for (const defibrillator of defibrillators) {
//       const result = dijkstraGraph(graph, volunteer, defibrillator);
//       const distance = result.distance + sensorDistances[defibrillator];
//       if (distance < shortestDistance) {
//         shortestDefibrillator = defibrillator;
//         shortestDistance = distance;
//         shortestPath = result.path;
//       }
//     }
//     shortestPath.push(sensor);
//     shortestPaths[volunteer] = {
//       path: shortestPath,
//       distance: shortestDistance,
//     };
//   }

//   // Find the shortest path and distance among all the paths
//   let shortestPath = null;
//   let shortestDistance = Infinity;
//   for (const volunteer in shortestPaths) {
//     if (shortestPaths[volunteer].distance < shortestDistance) {
//       shortestPath = shortestPaths[volunteer].path;
//       shortestDistance = shortestPaths[volunteer].distance;
//     }
//   }

//   return { path: shortestPath, distance: shortestDistance };
// }






//==========================================================================================================================
// import PriorityQueue from 'js-priority-queue'; // import the priority queue library

// export async function findShortestPath(graph, drowningNode) {
//   const defibrillators = [];
//   const volunteers = [];

//   // Find all defibrillator and volunteer nodes
//   for (const node of graph) {
//     if (node.type === 'defibrillator') {
//       defibrillators.push(node);
//     } else if (node.type === 'volunteer') {
//       volunteers.push(node);
//     }
//   }

//   const shortestPaths = {}; // Store the shortest path and distance for each volunteer node

//   // Find the shortest path from each defibrillator to the drowning node
//   const drowningDistances = {};
//   for (const defibrillator of defibrillators) {
//     const result = dijkstraGraph(graph, defibrillator, drowningNode);
//     drowningDistances[defibrillator.id] = result.distance;
//   }

//   // Find the shortest path from the drowning node to each volunteer passing through the defibrillator with the shortest path to the drowning node
//   for (const volunteer of volunteers) {
//     let shortestDefibrillator = null;
//     let shortestDistance = Infinity;
//     let shortestPath = null;
//     for (const defibrillator of defibrillators) {
//       const result = dijkstraGraph(graph, drowningNode, defibrillator);
//       const distance = result.distance + drowningDistances[defibrillator.id];
//       if (distance < shortestDistance) {
//         shortestDefibrillator = defibrillator;
//         shortestDistance = distance;
//         shortestPath = result.path;
//       }
//     }
//     if (shortestPath !== null) {
//       shortestPath.push(volunteer);
//       shortestPaths[volunteer.id] = {
//         path: shortestPath,
//         distance: shortestDistance,
//       };
//     }
//   }

//   // Find the shortest path and distance among all the paths
//   let shortestPath = null;
//   let shortestDistance = Infinity;
//   for (const volunteer in shortestPaths) {
//     if (shortestPaths[volunteer].distance < shortestDistance) {
//       shortestPath = shortestPaths[volunteer].path;
//       shortestDistance = shortestPaths[volunteer].distance;
//     }
//   }
// console.log(shortestPath);
//   return { path: shortestPath, distance: shortestDistance };
// }

// function dijkstraGraph(graph, source, target) {
//   const distances = {}; // map of distances from the source node to each node in the graph
//   const previous = {}; // map of previous nodes in the shortest path from the source node to each node in the graph
//   const queue = new PriorityQueue({
//     // priority queue of nodes to visit, separated by distance from the source node
//     comparator: (a, b) => distances[a] - distances[b],
//   });

//   // initialize distances and previous nodes
//   for (const node of graph) {
//     if (node === source) {
//       distances[node.id] = 0;
//       queue.queue(node);
//     } else {
//       distances[node.id] = Infinity;
//       queue.queue(node);
//     }
//     previous[node.id] = null;
//   }

//   // visit nodes in priority order
//   while (queue.length > 0) {
//     const currentNode = queue.dequeue();

//     // update distances and previous nodes for neighboring nodes
//     for (const neighbor of currentNode.neighbors) {
//       const distance = neighbor.distance;
//       const totalDistance = distances[currentNode.id] + distance;

//       if (totalDistance < distances[neighbor.id]) {
//         distances[neighbor.id] = totalDistance;
//         previous[neighbor.id] = currentNode.id;
//         queue.queue(neighbor);
//       }
//     }
//   }

//   // construct shortest path
//   const path = [];
//   let currentNode = target.id;

//   while (currentNode !== null) {
//     path.unshift(currentNode);
//     currentNode = previous[currentNode];
//   }

//   // return shortest path and distance
//   return { path, distance: distances[target.id] };
// }

//=================================================================================================================================
// import PriorityQueue from 'js-priority-queue';

import PriorityQueue from 'js-priority-queue';

export async function findShortestPath(graph, sensor, volunteers) {
  const defibrillators = graph.filter(node => node.type === "defibrilator");

  const shortestPaths = {};

  for (const volunteer of volunteers) {
    let shortestDistance = Infinity;
    let shortestPath = [];

    for (const defibrillator of defibrillators) {
      const result = dijkstraGraph(graph, volunteer.id, sensor.id, defibrillator.id);
      const distance = result.distance;
      const path = result.path;

      if (distance < shortestDistance) {
        shortestDistance = distance;
        shortestPath = path;
      }
    }

    shortestPath.push(sensor.id);
    shortestPaths[volunteer.id] = {
      path: shortestPath,
      distance: shortestDistance
    };
  }

  return shortestPaths;
}

function dijkstraGraph(graph, source, target, defibrillator) {
  const distances = {};
  const previous = {};
  const queue = new PriorityQueue({
    comparator: (a, b) => distances[a] - distances[b]
  });

  for (const node of graph) {
    if (node.id === source) {
      distances[node.id] = 0;
      queue.queue(node.id);
    } else {
      distances[node.id] = Infinity;
      queue.queue(node.id);
    }
    previous[node.id] = null;
  }

  while (queue.length > 0) {
    const currentVertex = queue.dequeue();

    for (const neighbor of graph[currentVertex].neighbor) {
      const distance = neighbor.distance;
      const totalDistance = distances[currentVertex] + distance;

      if (currentVertex === defibrillator || (previous[currentVertex] && graph[previous[currentVertex]].type === 'defibrilator')) {
        if (neighbor.id.startsWith("volunteer") && totalDistance < distances[neighbor.id]) {
          distances[neighbor.id] = totalDistance;
          previous[neighbor.id] = currentVertex;
          queue.queue(neighbor.id);
        }
      } else {
        if (totalDistance < distances[neighbor.id]) {
          distances[neighbor.id] = totalDistance;
          previous[neighbor.id] = currentVertex;
          queue.queue(neighbor.id);
        }
      }
    }
  }

  const path = [];
  let currentVertex = target;

  while (currentVertex !== null) {
    path.unshift(currentVertex);
    currentVertex = previous[currentVertex];
  }

  return { path, distance: distances[target] };
}
