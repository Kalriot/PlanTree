import React, { useState } from 'react';
import {
  Box,
  Avatar,
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

import { TbSitemap, TbUsers, TbLogout } from 'react-icons/tb';
import { useDisclosure } from '@mantine/hooks';
import { uploadPDF } from '../../../utils/uploadPDF';
import { fetchData } from '../../../utils/fetchData';
import { useGlobalStore } from '../../../store/useGlobalStore';

export default function CustomHeader() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [carrera, setCarrera] = useState('');

  const [logoutModalOpened, { open: openLogoutModal, close: closeLogoutModal }] =
    useDisclosure(false);

  const handleLogout = () => {
    setUser(null);
    closeLogoutModal();
  };

  const handleSelectPdf = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const result = await uploadPDF(file);
    setLoading(false);

    if (result.success) {
      alert('✅ Archivo subido correctamente');
      setCarrera(result.carrera?.toUpperCase() || '');
    } else {
      alert('❌ Error al subir el PDF: ' + result.error);
    }
  };

  const getInitials = (username) => {
    if (!username.includes('.')) return 'SM';
    const [firstName, lastName] = username.split('.');
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  };

  return (
    <Group h="100%" px="md" style={{ justifyContent: 'space-between' }}>
      {/* Logo y título */}
      <Group spacing="xs">
        <TbSitemap size={36} />
        <Text size="24px" fw={700}>CourseTree</Text>
      </Group>

      {/* Carrera extraída */}
      {carrera && (
        <Text fw={600} size="sm" style={{ textTransform: 'uppercase' }}>
          {carrera}
        </Text>
      )}

      {/* Sesión de usuario + Botón subir PDF */}
      <Group>
        {/* Botón subir PDF */}
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={handleSelectPdf}
        />
        <Button
          variant="outline"
          color="teal"
          onClick={() => document.getElementById('pdf-upload').click()}
          disabled={loading}
        >
          {loading ? <Loader size="xs" /> : 'Subir PDF'}
        </Button>

        {user ? (
          <Group>
            <Avatar color="blue" radius="xl">{getInitials(user)}</Avatar>
            <Box><Text>{user}</Text></Box>
            <Button onClick={openLogoutModal} variant="outline" rightIcon={<TbLogout size={20} />}>
              Cerrar Sesión
            </Button>
          </Group>
        ) : (
          <UserModal />
        )}
      </Group>

      {/* Modal cerrar sesión */}
      <Modal opened={logoutModalOpened} onClose={closeLogoutModal} centered withCloseButton={false}>
        <Text>¿Está seguro de que desea cerrar sesión?</Text>
        <Group position="right" mt="md">
          <Button onClick={closeLogoutModal} variant="outline">Cancelar</Button>
          <Button onClick={handleLogout} color="red">Cerrar Sesión</Button>
        </Group>
      </Modal>
    </Group>
  );
}

function UserModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUser = useGlobalStore((state) => state.setUser);

  const handleLogin = async (user, pass) => {
    setLoading(true);
    setError(null);
    if (user.includes('@')) user = user.split('@')[0];

    const result = await fetchData(user, pass);
    setLoading(false);

    if (result.success) {
      setUser(user);
      close();
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <UserModalContent onLogin={handleLogin} loading={loading} error={error} />
      </Modal>
      <Button onClick={open} variant="outline" rightIcon={<TbUsers size={20} />}>
        Acceder
      </Button>
    </>
  );
}

function UserModalContent({ onLogin, loading, error }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(user, pass);
  };

  return (
    <Container size={420} my={40}>
      <Title order={2} ta="center">Bienvenido a CourseTree!</Title>
      <Space h="xs" />
      <Text ta="center" mt={5}>Inicie sesión en SUM para empezar ✨</Text>

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
            Por favor, verifique sus credenciales e intente nuevamente.
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
