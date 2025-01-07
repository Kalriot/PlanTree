import { Stack, Title, Text } from '@mantine/core';
import { useGlobalStore } from '../../store/useGlobalStore';

export default function Aside() {
  const selectedNodeData = useGlobalStore((state) => state.getNodeData());

  return (
    <Stack>
      <Title order={3}>Detalles</Title>

      {selectedNodeData ? (
        <Stack>
          <Text>
            <strong>Nombre:</strong> {selectedNodeData.data.label}
          </Text>
          <Text>
            <strong>ID:</strong> {selectedNodeData.id}
          </Text>
          <Text>
            <strong>Ciclo:</strong> {selectedNodeData.ciclo}
          </Text>
          <Text>
            <strong>Creditos:</strong> #
          </Text>
        </Stack>
      ) : (
        <Text>No hay nodo seleccionado</Text>
      )}
    </Stack>
  );
}
