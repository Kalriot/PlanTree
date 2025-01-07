import { create } from 'zustand';
import { initialNodes } from '../components/Flow/data/nodes';
import { initialEdges } from '../components/Flow/data/edges';

import {
  applyEdgeChanges,
  applyNodeChanges,
  EdgeChange,
  NodeChange,
  OnEdgesChange,
  OnNodesChange,
} from 'reactflow';

interface GlobalStore {
  nodes: any[];
  edges: any[];

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;

  updateEdges: (updateFn: (edges: any[]) => any[]) => void;

  selectedNode: any;
  setSelectedNode: (nodeId: any) => void;
  getNodeData: () => any;

  setNodes: (nodes: any[]) => void;
  setEdges: (edges: any[]) => void;
}

export const useGlobalStore = create<GlobalStore>()((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  updateEdges: (updateFn: (edges: any[]) => any[]) => {
    set((state) => ({
      edges: updateFn(state.edges),
    }));
  },

  selectedNode: null,
  setSelectedNode: (nodeId: any) => set({ selectedNode: nodeId }),
  getNodeData: () => {
    const nodes = get().nodes;
    const selectedNode = get().selectedNode;
    return nodes.find((node) => node.id === selectedNode);
  },

  setNodes: (nodes: any[]) => set({ nodes }),
  setEdges: (edges: any[]) => set({ edges }),
}));
