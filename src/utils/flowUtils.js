// Función BFS para recorrer el grafo
export const bfs = (startNode, adjListSource) => {
  let visited = new Set();
  let queue = [startNode];
  let result = [];

  while (queue.length > 0) {
    let node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      if (adjListSource[node]) {
        queue.push(...adjListSource[node]);
      }
    }
  }

  return result;
};
