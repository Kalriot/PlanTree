import { useGlobalStore } from '../store/useGlobalStore';
import { transformData } from './trasformData';

export const fetchData = async (user, pass) => {
  
  const setNodes = useGlobalStore.getState().setNodes;
  const setEdges = useGlobalStore.getState().setEdges;

  try {
    const response = await fetch('http://127.0.0.1:5000/login', { // <-- CAMBIADO
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, pass }),
    });
    


    //setNodes(nodes);
    //setEdges(edges);

    // testing
    // console.log('Data fetched', result);
    // console.log('Data transformed and set');
    // console.log('Nodes:', nodes);
    // console.log('Edges:', edges);

    return { success: true,  };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
// utils/registerUser.js
export const saveCourseState = async (data) => {
  const response = await fetch('http://localhost:5000/guardar_estado', {
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
    const response = await fetch('http://127.0.0.1:5000/register', {
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

