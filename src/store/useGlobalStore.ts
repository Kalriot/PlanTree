import { create } from 'zustand';
import { initialNodes } from '../components/Flow/data/nodes';
import { applyNodeChanges, NodeChange, OnNodesChange } from 'reactflow';

interface GlobalStore {
  nodes: any[];
  edges: any[];

  onNodesChange: OnNodesChange;

  selectedNode: any;
  setSelectedNode: (nodeId: any) => void;

  setNodes: (nodes: any[]) => void;
  getNodeData: () => any;
}

export const useGlobalStore = create<GlobalStore>()((set, get) => ({
  nodes: initialNodes,
  edges: [],

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  selectedNode: null,
  setSelectedNode: (nodeId: any) => set({ selectedNode: nodeId }),

  setNodes: (nodes: any[]) => set({ nodes }),
  getNodeData: () => {
    const nodes = get().nodes;
    const selectedNode = get().selectedNode;
    return nodes.find((node) => node.id === selectedNode);
  },
}));
