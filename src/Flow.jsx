import ReactFlow, { Background, Controls } from 'reactflow';

import 'reactflow/dist/style.css';
import '../src/customFlow.css';

import { SmartBezierEdge } from '@tisoap/react-flow-smart-edge';

import { nodes } from './nodes';
import { edges } from './edges';

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
      onNodeClick={(event, node) => console.log('click', node)}
      elementsSelectable={true}
      fitView
      style={{ background: '#121212' }}
    >
      <Background color="#626262" />
      <Controls />
    </ReactFlow>
  );
};
