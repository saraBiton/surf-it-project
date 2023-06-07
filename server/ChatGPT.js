function findShortestPath(graph, startVertex) {
    const distances = {};
    const previousVertices = {};
    const visited = {};
  
    for (let vertex in graph) {
      distances[vertex] = Infinity;
      previousVertices[vertex] = null;
    }
  
    distances[startVertex] = 0;
  
    while (true) {
      let closestVertex = null;
      let shortestDistance = Infinity;
  
      for (let vertex in graph) {
        if (!visited[vertex] && distances[vertex] < shortestDistance) {
          closestVertex = vertex;
          shortestDistance = distances[vertex];
        }
      }
  
      if (closestVertex === null) {
        break;
      }
  
      visited[closestVertex] = true;
  
      for (let neighbor in graph[closestVertex]) {
        let weight = graph[closestVertex][neighbor];
  
        if (weight < distances[neighbor]) {
          distances[neighbor] = weight;
          previousVertices[neighbor] = closestVertex;
        }
      }
    }
  
    // Find the nearest volunteer
    let volunteer = null;
    let shortestDistance = Infinity;
    for (let vertex in graph) {
      if (vertex.startsWith('volunteer') && distances[vertex] < shortestDistance) {
        volunteer = vertex;
        shortestDistance = distances[vertex];
      }
    }
  
    // Build the path from the drowning man to the nearest volunteer
    const path = [];
    let currentVertex = volunteer;
    while (currentVertex !== startVertex) {
      path.unshift(currentVertex);
      currentVertex = previousVertices[currentVertex];
    }
    path.unshift(startVertex);
  
    return path;
  }
  
  // Define the graph
  const graph = {
    drowningMan: {
      defibrillator1: 10,
      defibrillator2: 5,
    },
    defibrillator1: {
      volunteer1: 8,
      volunteer2: 6,
    },
    defibrillator2: {
      volunteer1: 3,
      volunteer2: 4,
    },
  };
  
  // Find the shortest path from the drowning man to the nearest volunteer
  const shortestPath = findShortestPath(graph, 'drowningMan');
  console.log('Shortest path:', shortestPath);
  