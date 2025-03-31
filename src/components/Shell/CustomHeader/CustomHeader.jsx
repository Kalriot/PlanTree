import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Button,
  Group,
  Modal,
  Text,
  Loader,
  Paper,
  TextInput,
  PasswordInput,
  Title,
} from '@mantine/core';
import { TbSitemap, TbUsers, TbLogout } from 'react-icons/tb';
import { IconCheck } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { uploadPDF } from '../../../utils/uploadPDF';
import { fetchData,registerUser,saveCourseState  } from '../../../utils/fetchData';
import { useGlobalStore } from '../../../store/useGlobalStore';

export default function CustomHeader() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [carrera, setCarrera] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [logoutModalOpened, { open: openLogoutModal, close: closeLogoutModal }] = useDisclosure(false);
  
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

  const handleSaveState = async () => {
    const tokenArchivo = useGlobalStore.getState().tokenArchivo;
    
    const user = useGlobalStore.getState().user;    
    if (!user) {
      alert('Debes iniciar sesión  para guardar información.');
      return;
    }
    if (!tokenArchivo) {
      alert('Debes subr un PDF para guardar información.');
      return;
    }

    const notasPorCurso = localStorage.getItem("notasPorCurso");
    console.log(tokenArchivo);
    const result = await saveCourseState({
      user,
      tokenArchivo,
      notas: JSON.parse(notasPorCurso || '{}'),
    });


    if (result.success) {
      alert('✅ Guardado exitoso');
    } else {
      alert('❌ No se pudo guardar: ' + result.error);
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

      {/* Sesión de usuario + Botón subir PDF + Guardar */}
      <Group>
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

        <Button color="blue" variant="filled" onClick={handleSaveState}>
          Guardar
        </Button>

        {successMessage && (
          <Alert icon={<IconCheck size={18} />} color="teal" radius="md" style={{ marginLeft: 10 }}>
            {successMessage}
          </Alert>
        )}

        {user ? (
          <Group>
            <Avatar color="blue" radius="xl">{getInitials(user)}</Avatar>
            <Box><Text>{user}</Text></Box>
            <Button onClick={openLogoutModal} variant="outline" rightIcon={<TbLogout size={20} />}>
              Cerrar Sesión
            </Button>
          </Group>
        ) : (
          <UserModal setCarrera={setCarrera} />
        )}
      </Group>

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
// Login + Registro Modal (tipo slider)
function UserModal({ setCarrera }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUser = useGlobalStore((state) => state.setUser);
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const result = await fetchData(username, pass); // username como identificador
    setLoading(false);

    if (result.success) {
      
      setUser(username);
      setCarrera(result.carrera?.toUpperCase() || '');
      close();
    } else {
      setError(result.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      if (pass !== confirmPass) {
        setError('Las contraseñas no coinciden');
        return;
      }

      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
        setError('Correo inválido');
        return;
      }

      const tokenArchivo = useGlobalStore.getState().tokenArchivo;
      const result = await registerUser({
        user: username,
        correo,
        pass,
        tokenArchivo,
      });

      if (result.success) {
        alert('✅ Registro exitoso');
        setIsRegister(false);
      } else {
        setError(result.error);
      }
    } else {
      handleLogin();
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false} size="auto">
        <div
          style={{
            display: 'flex',
            flexDirection: isRegister ? 'row-reverse' : 'row',
            width: '100%',
            maxWidth: '700px',
            minWidth: '300px',
            flexWrap: 'wrap',
            transition: 'all 0.5s ease',
          }}
        >
          <Paper
            p="lg"
            style={{
              width: '50%',
              backgroundColor: '#8b1b1e',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: isRegister ? '0 10px 10px 0' : '10px 0 0 10px',
            }}
          >
            <Title order={3}>
              {isRegister ? '¿Ya tienes una cuenta?' : '¿Aún no tienes una cuenta?'}
            </Title>
            <Text ta="center" mt="xs">
              {isRegister ? 'Inicia sesión para guardar.' : 'Regístrate para comenzar.'}
            </Text>
            <Button
              mt="md"
              variant="outline"
              color="gray"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Iniciar Sesión' : 'Registrarse'}
            </Button>
          </Paper>

          <Paper p="xl" withBorder style={{ width: '50%' }}>
            <form onSubmit={handleSubmit}>
              <Title order={2} ta="center" mb="lg">
                {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
              </Title>

              {/* Campo de username (siempre visible) */}
              <TextInput
                label="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                mt="md"
              />

              {/* Campo de correo solo para registro */}
              {isRegister && (
                <>
                  <TextInput
                    label="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    mt="md"
                  />
                  {correo && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo) && (
                    <Text color="red" size="sm" mt="xs">
                      Ingresa un correo válido
                    </Text>
                  )}
                </>
              )}

              <PasswordInput
                label="Contraseña"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
                mt="md"
              />

              {isRegister && (
                <PasswordInput
                  label="Confirmar Contraseña"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                  mt="md"
                />
              )}

              <Button type="submit" fullWidth mt="xl" disabled={loading}>
                {loading ? 'Cargando...' : isRegister ? 'Registrarse' : 'Iniciar Sesión'}
              </Button>

              {error && (
                <Text color="red" mt="md" ta="center">
                  {error}
                </Text>
              )}
            </form>
          </Paper>
        </div>
      </Modal>

      <Button
        onClick={() => {
          setCorreo('');
          setUsername('');
          setPass('');
          setConfirmPass('');
          setError(null);
          setIsRegister(false);
          open();
        }}
        variant="outline"
        rightIcon={<TbUsers size={20} />}
      >
        Acceder
      </Button>
    </>
  );
}
