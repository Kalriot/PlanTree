import React, { useState, useEffect, useCallback } from 'react';

import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './customFlow.css';

import { SmartStraightEdge } from '@tisoap/react-flow-smart-edge';

import { initialNodes } from './data/nodes';
import { initialEdges } from './data/edges';

import { bfs } from './utils/flowUtils';
import { useGlobalStore } from '../../store/useGlobalStore';

const edgeTypes = {
  smart: SmartStraightEdge,
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const setGlobalNodes = useGlobalStore((state) => state.setNodes);

  const selectedNode = useGlobalStore((state) => state.selectedNode);
  const setSelectedNode = useGlobalStore((state) => state.setSelectedNode);

  // const [selectedNode, setSelectedNode] = useState(null);

  const [adjListSource, setAdjListSource] = useState({}); // Lista para apertura de cursos
  const [adjListTarget, setAdjListTarget] = useState({}); // Lista para pre-requisitos

  // Creacion de adjLists
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

  // Marcado de edges
  useEffect(() => {
    let markedEdgesTarget = [];
    let markedEdgesSource = [];

    if (selectedNode) {
      if (adjListTarget[selectedNode]) {
        adjListTarget[selectedNode].forEach((node) => {
          markedEdgesTarget.push(node + '-' + selectedNode);
        });
      }

      const reachableNodes = bfs(selectedNode, adjListSource);

      reachableNodes.forEach((node) => {
        markedEdgesSource.push(node);
      });
    }

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

  // Actualizar el global store con los nodos actualizados
  useEffect(() => {
    setGlobalNodes(nodes);
  }, [nodes, setGlobalNodes]);

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
      //
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      //
      elementsSelectable={true}
      onPaneClick={handlePaneClick}
      style={{ background: '#121212' }}
      fitView
      minZoom={0}
    >
      <Background color="#626262" />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
};

export default React.memo(Flow);
