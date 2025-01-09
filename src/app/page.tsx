'use client';

import { MantineProvider } from '@mantine/core';
import Main from '../components/Main/Main';

export default function Page() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Poppins, system-ui, Avenir, Helvetica, Arial, sans-serif',
        colorScheme: 'dark',
      }}
    >
      <Main />
    </MantineProvider>
  );
}
