import {
  AppShell,
  Aside,
  Footer,
  Header,
  MediaQuery,
  Box,
  Center,
  Flex,
  ActionIcon,
} from '@mantine/core';

import { useState } from 'react';

import CustomAside from './CustomAside/CustomAside';
import CustomFooter from './CustomFooter/CustomFooter';
import CustomHeader from './CustomHeader/CustomHeader.jsx';

import Flow from './Flow/Flow';

import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { useReactFlow } from 'reactflow';

function Shell() {
  const [asideOpened, setAsideOpened] = useState(true);

  const reactFlow = useReactFlow();

  const toggleAside = () => {
    setTimeout(reactFlow.fitView);
    setAsideOpened((prev) => !prev);
  };

  return (
    <AppShell
      asideOffsetBreakpoint="sm"
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside
            p="md"
            width={{ sm: asideOpened ? 400 : 100, lg: asideOpened ? 500 : 100 }}
          >
            <Flex style={{ height: '100%' }}>
              {asideOpened && (
                <Box style={{ flex: 1 }}>
                  <CustomAside />
                </Box>
              )}
              <Center style={{ width: 67 }}>
                <ActionIcon
                  onClick={toggleAside}
                  variant="subtle"
                  style={{ width: '100%', height: '100%' }}
                  alt={asideOpened ? 'Ocultar detalles' : 'Mostrar detalles'}
                >
                  {asideOpened ? (
                    <TbChevronRight size={25} />
                  ) : (
                    <TbChevronLeft size={25} />
                  )}
                </ActionIcon>
              </Center>
            </Flex>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          <CustomFooter />
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <CustomHeader />
        </Header>
      }
    >
      {/* // Contenido principal */}
      <Box style={{ width: '100%', height: '100%' }}>
        <Flow />
      </Box>
    </AppShell>
  );
}

export default Shell;