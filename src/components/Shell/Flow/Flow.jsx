import React, { useEffect, useCallback } from 'react';

import ReactFlow, { Background, Controls } from 'reactflow';

import 'reactflow/dist/style.css';
import './customFlow.css';

import { SmartStraightEdge } from '@tisoap/react-flow-smart-edge';

import { useGlobalStore } from '../../../store/useGlobalStore';
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
  const { nodes, edges, onEdgesChange } = useGlobalStore(useShallow(selector));

  const { selectedNode, setSelectedNode, markEdges } = useGlobalStore(
    (state) => ({
      selectedNode: state.selectedNode,
      setSelectedNode: state.setSelectedNode,
      markEdges: state.markEdges,
    })
  );

  // Creacion de adjLists
  // useEffect(() => {
  //   createAdjLists();
  // }, []);

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  // Marcado de edges
  useEffect(() => {
    markEdges();
  }, [selectedNode]);

  const handleNodeClick = useCallback((_, node) => {
    console.log('Node clicked:', node);
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
