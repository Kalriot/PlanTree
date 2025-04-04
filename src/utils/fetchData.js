import { useGlobalStore } from '../store/useGlobalStore';
import { transformData } from './trasformData';

export const fetchData = async (user, pass) => {
  const setNotasPorCurso = useGlobalStore.getState().setNotasPorCurso;  
  const setNodes = useGlobalStore.getState().setNodes;
  const setEdges = useGlobalStore.getState().setEdges;
  const setTokenArchivo = useGlobalStore.getState().setTokenArchivo; 
  try {
    const response = await fetch('https://flaskapiplan.onrender.com/login', { // <-- CAMBIADO
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, pass }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Error al subir el logearse');
    }
    setNotasPorCurso(result.notas); 
    const { nodes, edges } = transformData(result.cursos);
    setNodes(nodes);
    setEdges(edges);
    setTokenArchivo(result.tokenArchivo || '');
  
    
    return {
      success: true,
      data: result.cursos,
      carrera: result.carrera || '',
      tokenArchivo: result.tokenArchivo || '',
    };

  } catch (error) {
    return { success: false, error: error.message };
  }
};
// utils/registerUser.js
export const saveCourseState = async (data) => {
  const response = await fetch('https://flaskapiplan.onrender.com/guardar_estado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const registerUser = async ({ user, correo, pass ,tokenArchivo }) => {
  try {
    const response = await fetch('https://flaskapiplan.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, correo, pass, tokenArchivo }), 
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Error desconocido');
    }

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

