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

  useEffect(() => {
    setEdges((eds) => {
      const newEdges = eds.map((edge) => {
        const newEdge = { ...edge, style: { ...edge.style } };

        if (selectedNode === null) {
          newEdge.style.opacity = 1;
        } else if (edge.source !== selectedNode) {
          newEdge.style.opacity = 0.1;
        } else {
          newEdge.style.opacity = 1;
        }

        return newEdge;
      });

      return newEdges;
    });
  }, [selectedNode, setEdges]);

  const handleNodeClick = useCallback((_, node) => {
    setSelectedNode(node.id);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

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
