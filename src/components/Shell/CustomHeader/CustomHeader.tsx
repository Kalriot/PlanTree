import { Button, Group, Text } from '@mantine/core';
import { TbSitemap, TbUsers } from 'react-icons/tb';

export default function CustomHeader() {
  return (
    <Group h="100%" px="md" style={{ justifyContent: 'space-between' }}>
      <Group spacing="xs">
        <TbSitemap size={36} />
        <Text size="24px" fw={700}>
          CourseTree
        </Text>
      </Group>
      <Group>
        <Button
          variant="outline"
          color="white"
          rightIcon={<TbUsers size={20} />}
        >
          Acceder
        </Button>
      </Group>
    </Group>
  );
}
