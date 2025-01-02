import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

import { SmartBezierEdge } from '@tisoap/react-flow-smart-edge';

import { nodes, edges } from './data';

const edgeTypes = {
  smart: SmartBezierEdge,
};

export const Flow = () => {
  return (
    <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      edgeTypes={edgeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      style={{ background: '#121212' }}
    >
      <Background color="#626262" />
      <Controls />
    </ReactFlow>
  );
};
