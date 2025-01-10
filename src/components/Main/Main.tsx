import { Box, Group, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';

import Shell from '../Shell/Shell';
import { ReactFlowProvider } from 'reactflow';

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula la carga de datos o el estilo
    const timer = setTimeout(() => {
      setLoading(false); // Cambiar el estado a false cuando todo está listo
    }, 2500); // Ajusta el tiempo de espera según sea necesario

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Group>
            <Loader />
          </Group>
        </Box>
      ) : (
        <ReactFlowProvider>
          <Shell />
        </ReactFlowProvider>
      )}
    </>
  );
}
