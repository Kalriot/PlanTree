import { useGlobalStore } from '../store/useGlobalStore';
import { transformData } from './trasformData';

export const uploadPDF = async (file) => {
  const setNodes = useGlobalStore.getState().setNodes;
  const setEdges = useGlobalStore.getState().setEdges;

  const formData = new FormData();
  formData.append('pdf', file);

  try {
    const response = await fetch('https://cicilis.pythonanywhere.com/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al subir el PDF');
    }

    const { nodes, edges } = transformData(result.cursos);

    setNodes(nodes);
    setEdges(edges);

    return {
      success: true,
      data: result.cursos,
      carrera: result.carrera || '',
    };
  } catch (error) {
    console.error('Error al subir PDF:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
