import {
  Button,
  Container,
  Group,
  Modal,
  Paper,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
        <UserModal />
      </Group>
    </Group>
  );
}

function UserModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <UserModalContent />
      </Modal>
      <Button
        onClick={open}
        variant="outline"
        rightIcon={<TbUsers size={20} />}
      >
        Acceder
      </Button>
    </>
  );
}

function UserModalContent() {
  return (
    <Container size={420} my={40}>
      <Title order={2} ta="center">
        Bienvenido a CourseTree!
      </Title>
      <Space h="xs" />
      <Text ta="center" mt={5}>
        Inicie sesión en SUM para empezar ✨
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Usuario" required />
        <PasswordInput label="Contraseña" required mt="md" />
        <Button fullWidth mt="xl">
          Iniciar Sesión
        </Button>
      </Paper>
    </Container>
  );
}
