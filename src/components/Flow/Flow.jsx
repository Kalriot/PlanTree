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

// import { initialNodes } from './data/nodes';
// import { initialEdges } from './data/edges';

import { bfs } from './utils/flowUtils';

import { useGlobalStore } from '../../store/useGlobalStore';
import { useShallow } from 'zustand/react/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
});

const edgeTypes = {
  smart: SmartStraightEdge,
};

const Flow = () => {
  const { nodes, onNodesChange, edges, onEdgesChange } = useGlobalStore(
    useShallow(selector)
  );

  const {
    selectedNode,
    setSelectedNode,
    updateEdges,
    createAdjLists,
    adjListSource,
    adjListTarget,
  } = useGlobalStore((state) => ({
    selectedNode: state.selectedNode,
    setSelectedNode: state.setSelectedNode,

    updateEdges: state.updateEdges,

    createAdjLists: state.createAdjLists,
    adjListSource: state.adjListSource, // Lista para apertura de cursos
    adjListTarget: state.adjListTarget, // Lista para pre-requisitos
  }));

  // const [, setAdjListSource] = useState({});
  // const [, setAdjListTarget] = useState({});

  // Creacion de adjLists
  useEffect(() => {
    // let newAdjListSource = {};
    // let newAdjListTarget = {};

    // edges.forEach((edge) => {
    //   if (newAdjListSource[edge.source] === undefined) {
    //     newAdjListSource[edge.source] = [];
    //   }
    //   newAdjListSource[edge.source].push(edge.target);

    //   if (newAdjListTarget[edge.target] === undefined) {
    //     newAdjListTarget[edge.target] = [];
    //   }
    //   newAdjListTarget[edge.target].push(edge.source);
    // });

    // setAdjListSource(newAdjListSource);
    // setAdjListTarget(newAdjListTarget);
    createAdjLists();
  }, []);

  // Marcado de edges
  useEffect(() => {
    let markedEdgesTarget = [];
    let markedEdgesSource = [];

    // console.log('selectedNode', selectedNode);

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

    // console.log('markedEdgesTarget', markedEdgesTarget);
    // console.log('markedEdgesSource', markedEdgesSource);

    updateEdges((eds) => {
      // console.log('hola');
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
  }, [selectedNode, updateEdges]);

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
