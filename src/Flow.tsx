import ReactFlow, { Background, Controls } from 'reactflow';
import { SmartBezierEdge } from '@tisoap/react-flow-smart-edge';
import 'reactflow/dist/style.css';

let nodes = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 300, y: 100 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 300, y: 200 },
  },
];

let edges = [
  {
    id: 'e12',
    source: '1',
    target: '2',
  },
];

nodes = nodes.map((node) => ({
  ...node,
  sourcePosition: 'right',
  targetPosition: 'left',
}));

edges = edges.map((edge) => ({
  ...edge,
  type: 'smart',
}));

const edgeTypes = {
  smart: SmartBezierEdge,
};

export const Flow = () => {
  return (
    <ReactFlow defaultNodes={nodes} defaultEdges={edges} edgeTypes={edgeTypes}>
      <Background />
      <Controls />
    </ReactFlow>
  );
};
