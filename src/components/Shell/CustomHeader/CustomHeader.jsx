import React, { useState } from 'react';
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
  Loader,
  Alert,
} from '@mantine/core';

import { TbSitemap, TbUsers } from 'react-icons/tb';
import { useDisclosure } from '@mantine/hooks';

import { fetchData } from '../../../utils/fetchData';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (user, pass) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await fetchData(user, pass);

    setLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <UserModalContent
          onLogin={handleLogin}
          loading={loading}
          error={error}
          success={success}
        />
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

// eslint-disable-next-line react/prop-types
function UserModalContent({ onLogin, loading, error, success }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(user, pass);
  };

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
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <PasswordInput
            label="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl" disabled={loading}>
            {loading ? <Loader size="sm" /> : 'Iniciar Sesión'}
          </Button>
        </form>
        {error && (
          <Alert color="red" mt="md">
            {error}
          </Alert>
        )}
        {success && (
          <Alert color="green" mt="md">
            Inicio de sesión exitoso!
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
