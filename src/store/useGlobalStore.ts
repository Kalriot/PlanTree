import { create } from 'zustand';

interface GlobalStore {
  nodes: any[];
  edges: any[];
  selectedNode: any;
  setNodes: (nodes: any[]) => void;
  setSelectedNode: (nodeId: any) => void;
  getNodeData: () => any;
}

export const useGlobalStore = create<GlobalStore>()((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  setNodes: (nodes: any[]) => set({ nodes }),
  setSelectedNode: (nodeId: any) => set({ selectedNode: nodeId }),
  getNodeData: () => {
    const nodes = get().nodes;
    const selectedNode = get().selectedNode;
    return nodes.find((node) => node.id === selectedNode);
  },
}));
