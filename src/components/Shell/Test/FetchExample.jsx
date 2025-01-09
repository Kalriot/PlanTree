import React, { useEffect, useState, useRef } from 'react';
import { transformData } from './nodes-edges';

import { useGlobalStore } from '../../../store/useGlobalStore';

const FetchAsignaturas = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const didFetch = useRef(false);

  const setNodes = useGlobalStore((state) => state.setNodes);
  const setEdges = useGlobalStore((state) => state.setEdges);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: 'jean.lavaud', // Reemplaza con el usuario adecuado
            pass: 'MrSquatch20', // Reemplaza con la contraseña adecuada
          }),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || 'Error desconocido');
        }
        console.log(result);

        const { nodes, edges } = transformData(result.data);

        console.log('nodes:', nodes);
        console.log('edges:', edges);

        setNodes(nodes);
        setEdges(edges);

        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (!didFetch.current) {
      fetchData();
      didFetch.current = true;
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default FetchAsignaturas;
