import { Box } from '@mantine/core';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const edges = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

const nodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

function Flow() {
  return (
    <Box style={{ width: '100%', height: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
}

export default Flow;
