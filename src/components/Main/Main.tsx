import {
  AppShell,
  Aside,
  Footer,
  Header,
  MediaQuery,
  Box,
} from '@mantine/core';

import Flow from '../Flow/Flow';

import CustomAside from '../CustomAside/CustomAside';
import CustomFooter from '../CustomFooter/CustomFooter';
import CustomHeader from '../CustomHeader/CustomHeader';

function Main() {
  return (
    <AppShell
      asideOffsetBreakpoint="sm"
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 400, lg: 500 }}>
            <CustomAside />
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
        <Flow></Flow>
      </Box>
    </AppShell>
  );
}

export default Main;
