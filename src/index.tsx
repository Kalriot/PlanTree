import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Poppins, system-ui, Avenir, Helvetica, Arial, sans-serif',
        colorScheme: 'dark',
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
