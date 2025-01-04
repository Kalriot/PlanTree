import React, { useState, useEffect, useCallback } from 'react';

import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import 'reactflow/dist/style.css';
import '../src/customFlow.css';

import { SmartStraightEdge } from '@tisoap/react-flow-smart-edge';

import { initialNodes } from './nodes';
import { initialEdges } from './edges';

const edgeTypes = {
  smart: SmartStraightEdge,
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] = useState(null);

  const [adjListSource, setAdjListSource] = useState({}); // lista para apertura de cursos
  const [adjListTarget, setAdjListTarget] = useState({}); // lista para pre-requisitos

  useEffect(() => {
    let newAdjListSource = {};
    let newAdjListTarget = {};

    initialEdges.forEach((edge) => {
      if (newAdjListSource[edge.source] === undefined) {
        newAdjListSource[edge.source] = [];
      }
      newAdjListSource[edge.source].push(edge.target);

      if (newAdjListTarget[edge.target] === undefined) {
        newAdjListTarget[edge.target] = [];
      }
      newAdjListTarget[edge.target].push(edge.source);
    });

    setAdjListSource(newAdjListSource);
    setAdjListTarget(newAdjListTarget);
  }, []);

  // console.log('apertura', adjListSource);
  // console.log('pre-requisitos', adjListTarget);

  // Función BFS para recorrer el grafo
  const bfs = (startNode) => {
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

  useEffect(() => {
    let markedEdgesTarget = [];
    let markedEdgesSource = [];

    if (selectedNode) {
      if (adjListTarget[selectedNode]) {
        adjListTarget[selectedNode].forEach((node) => {
          markedEdgesTarget.push(node + '-' + selectedNode);
        });
      }

      const reachableNodes = bfs(selectedNode);

      reachableNodes.forEach((node) => {
        markedEdgesSource.push(node);
      });
    }

    // console.log('markedEdgesTarget', markedEdgesTarget);
    // console.log('markedEdgesSource', markedEdgesSource);

    setEdges((eds) => {
      const newEdges = eds.map((edge) => {
        const newEdge = { ...edge, style: { ...edge.style } };

        if (selectedNode === null) {
          newEdge.hidden = false;
        } else if (markedEdgesTarget.includes(edge.id)) {
          newEdge.hidden = false;
        } else if (markedEdgesSource.includes(edge.source)) {
          newEdge.hidden = false;
        } else {
          newEdge.hidden = true;
        }

        return newEdge;
      });

      return newEdges;
    });
  }, [selectedNode, setEdges]);

  const handleNodeClick = useCallback((_, node) => {
    console.log(node);
    setSelectedNode(node.id);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // console.log('edges', edges);

  return (
    <ReactFlow
      nodes={nodes}
      nodesDraggable={false}
      nodesConnectable={false}
      onNodeClick={handleNodeClick}
      onPaneClick={handlePaneClick}
      elementsSelectable={true}
      onEdgesChange={onEdgesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      fitView
      minZoom={0}
      style={{ background: '#121212' }}
    >
      <Background color="#626262" />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
};

export default React.memo(Flow);
