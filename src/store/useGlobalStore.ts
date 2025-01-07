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

  selectedNode: any;
  setSelectedNode: (nodeId: any) => void;

  getNodeData: () => any;
  updateEdges: (updateFn: (edges: any[]) => any[]) => void;

  adjListSource: { [key: string]: string[] };
  adjListTarget: { [key: string]: string[] };

  setAdjListSource: (adjListSource: { [key: string]: string[] }) => void;
  setAdjListTarget: (adjListTarget: { [key: string]: string[] }) => void;

  createAdjLists: () => void;
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

  selectedNode: null,
  setSelectedNode: (nodeId: any) => set({ selectedNode: nodeId }),

  getNodeData: () => {
    const nodes = get().nodes;
    const selectedNode = get().selectedNode;
    return nodes.find((node) => node.id === selectedNode);
  },

  updateEdges: (updateFn: (edges: any[]) => any[]) => {
    set((state) => ({
      edges: updateFn(state.edges),
    }));
  },

  adjListSource: {},
  adjListTarget: {},

  setAdjListSource: (adjListSource: any) => set({ adjListSource }),
  setAdjListTarget: (adjListTarget: any) => set({ adjListTarget }),

  createAdjLists: () => {
    const edges = get().edges;

    console.log('edges', edges);

    let newAdjListSource: { [key: string]: string[] } = {};
    let newAdjListTarget: { [key: string]: string[] } = {};

    edges.forEach((edge) => {
      if (newAdjListSource[edge.source] === undefined) {
        newAdjListSource[edge.source] = [];
      }
      newAdjListSource[edge.source].push(edge.target);

      if (newAdjListTarget[edge.target] === undefined) {
        newAdjListTarget[edge.target] = [];
      }
      newAdjListTarget[edge.target].push(edge.source);
    });

    console.log('newAdjListSource', newAdjListSource);
    console.log('newAdjListTarget', newAdjListTarget);

    set({
      adjListSource: newAdjListSource,
      adjListTarget: newAdjListTarget,
    });
  },
}));
