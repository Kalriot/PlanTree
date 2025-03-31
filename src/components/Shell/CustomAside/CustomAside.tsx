import { useState, useEffect } from 'react';

import {
  Stack,
  Title,
  Text,
  Select,
  NumberInput,
  Button,
  Group,
  Divider,
  Alert,
  Grid,
  Table,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

import { useGlobalStore } from '../../../store/useGlobalStore';

export default function Aside() {
  const selectedNodeData = useGlobalStore((state) => state.getNodeData());
  const cursoId = selectedNodeData?.id;
  const nodes = useGlobalStore((state) => state.nodes);

  const [estado, setEstado] = useState<'ninguno' | 'llevado' | 'en curso'>('ninguno');
  const [nota, setNota] = useState<number | ''>('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [notaFinalEstimado, setNotaFinalEstimado] = useState<number>(0);
  const [notasPorCurso, setNotasPorCurso] = useState<Record<string, any>>({});
  const [parciales, setParciales] = useState<Array<{ nota: number | ''; porcentaje: number | '' }>>([]);
  const [alerta, setAlerta] = useState(false);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('notasPorCurso');
    if (datosGuardados) {
      setNotasPorCurso(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    if (!cursoId) return;
    const datosCurso = notasPorCurso[cursoId];

    if (datosCurso) {
      setEstado(datosCurso.estado);
      setNota(datosCurso.nota ?? '');
      setParciales(datosCurso.parciales ?? [{ nota: '', porcentaje: '' }]);
    } else {
      setEstado('ninguno');
      setNota('');
      setParciales([{ nota: '', porcentaje: '' }]);
    }
    setModoEdicion(false);
  }, [cursoId, notasPorCurso]);

  const guardarCambios = () => {
    const nuevaNota =
      estado === 'ninguno'
        ? undefined
        : {
            estado,
            nota: estado === 'llevado' ? (typeof nota === 'number' ? nota : 0) : undefined,
            parciales: estado === 'en curso' ? parciales : undefined,
          };

    setNotasPorCurso((prev) => {
      const actualizado = { ...prev, [cursoId]: nuevaNota };
      localStorage.setItem('notasPorCurso', JSON.stringify(actualizado));
      return actualizado;
    });

    setModoEdicion(false);
    setAlerta(true);
    setTimeout(() => setAlerta(false), 2000);
  };

  const agregarParcial = () => {
    setParciales((prev) => [...prev, { nota: '', porcentaje: '' }]);
  };

  const updateParcial = (index: number, key: 'nota' | 'porcentaje', value: number | '') => {
    const actualizados = [...parciales];
    actualizados[index][key] = value;
    setParciales(actualizados);
  };

  useEffect(() => {
    const total = parciales.reduce(
      (acc, parcial) => {
        if (parcial.nota !== '' && parcial.porcentaje !== '') {
          const peso = Number(parcial.porcentaje) / 100;
          acc.suma += Number(parcial.nota) * peso;
          acc.totalPeso += peso;
        }
        return acc;
      },
      { suma: 0, totalPeso: 0 }
    );
    setNotaFinalEstimado(
      total.totalPeso > 0 ? parseFloat((total.suma).toFixed(2)) : 0
    );
  }, [parciales]);
  const eliminarParcial = (index: number) => {
    setParciales((prev) => prev.filter((_, i) => i !== index));
  };
  const mostrarNotaFinal =
    estado === 'llevado'
      ? nota !== '' ? nota : 'No registrada'
      : estado === 'en curso'
      ? notaFinalEstimado
      : 'No registrada';

  if (!selectedNodeData || selectedNodeData.id.includes('nodoCiclo')) {
    const ciclosMap = new Map();
    let totalNotas = 0;
    let totalCreditos = 0;
    let totalCreditosLlevados = 0;

    nodes.forEach((node) => {
      if (!node.id.includes('nodoCiclo')) {
        const data = notasPorCurso[node.id];
        const creditos = Number(node.creditos) || 0;

        if (data?.estado === 'llevado' && typeof data?.nota === 'number') {
          const ciclo = node.ciclo || 'Sin ciclo';
          if (!ciclosMap.has(ciclo)) {
            ciclosMap.set(ciclo, { suma: 0, cantidad: 0, creditos: 0 });
          }
          const obj = ciclosMap.get(ciclo);
          obj.suma += data.nota;
          obj.cantidad += 1;
          obj.creditos += creditos;

          totalNotas += data.nota * creditos;
          totalCreditos += creditos;
          totalCreditosLlevados += creditos;
        }
      }
    });

    const rows = Array.from(ciclosMap.entries()).map(([ciclo, { suma, cantidad, creditos }]) => (
      <tr key={ciclo}>
        <td>{ciclo}</td>
        <td>{(suma / cantidad).toFixed(2)}</td>
        <td>{creditos}</td>
      </tr>
    ));

    return (
      <Stack p="md">
        <Title order={3}>Resumen de notas</Title>
        <Table withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Ciclo</th>
              <th>Promedio</th>
              <th>Créditos</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Divider my="sm" />
        <Text fw={600}>Promedio General: {totalCreditos > 0 ? (totalNotas / totalCreditos).toFixed(2) : 'Sin notas'}</Text>
        <Text fw={600}>Créditos llevados: {totalCreditosLlevados}</Text>
      </Stack>
    );
  }

  return (
    <div style={{ height: '80vh', overflowY: 'auto', padding: '16px' }}>
      <Stack spacing="sm">
        <Title order={3}>{selectedNodeData.data.label}</Title>
        <Text><strong>ID:</strong> {selectedNodeData.id}</Text>
        <Text><strong>Ciclo:</strong> {selectedNodeData.ciclo}</Text>
        <Text><strong>Créditos:</strong> {selectedNodeData.creditos}</Text>
        <Text><strong>Nota final: </strong>{mostrarNotaFinal}</Text>

        {alerta && (
          <Alert icon={<IconCheck size={16} />} color="teal" mt="xs">
            Datos guardados correctamente
          </Alert>
        )}

        <Divider my="sm" />

        <Select
          label="Estado"
          value={estado}
          onChange={(value) => setEstado(value as typeof estado)}
          data={[
            { value: 'ninguno', label: 'Ninguno' },
            { value: 'en curso', label: 'En curso' },
            { value: 'llevado', label: 'Llevado' },
          ]}
        />

        {estado === 'llevado' && (
          <>
            <NumberInput
              label="Nota final"
              value={nota}
              onChange={(value) => setNota(typeof value === 'number' ? value : 0)}
              min={0}
              max={20}
            />
            <Button fullWidth mt="sm" color="green" onClick={guardarCambios}>
              Guardar
            </Button>
          </>
        )}

        {estado === 'en curso' && (
          <>
            <Text mt="sm" fw={600}>Nota acumulada: {notaFinalEstimado}</Text>
            <div style={{ marginTop: '8px' }}>
              <Stack>
                {parciales.map((parcial, index) => (
                  <Grid key={index} gutter="xs">
                    <Grid.Col span={5}>
                      <NumberInput
                        label={`Nota ${index + 1}`}
                        value={parcial.nota}
                        onChange={(value) => updateParcial(index, 'nota', value)}
                        min={0}
                        max={20}
                      />
                    </Grid.Col>
                    <Grid.Col span={5}>
                      <NumberInput
                        label="%"
                        value={parcial.porcentaje}
                        onChange={(value) => updateParcial(index, 'porcentaje', value)}
                        min={0}
                        max={100}
                      />
                    </Grid.Col>
                    <Grid.Col span={2} style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Button
                        variant="subtle"
                        color="red"
                        size="compact-xs"
                        onClick={() => eliminarParcial(index)}
                        style={{ height: '30px', width: '20px', padding: 0, minWidth: 'unset', fontSize: '16px', lineHeight: 1 }}
                      >
                        -
                      </Button>
                    </Grid.Col>
                  </Grid>
                ))}
              </Stack>
            </div>

            <Group position="apart" mt="xs">
              <Button variant="light" onClick={agregarParcial}>+ Agregar nota</Button>
              <Button onClick={guardarCambios} color="green">Guardar</Button>
            </Group>
          </>
        )}

        {estado === 'ninguno' && (
          <Button color="red" mt="xs" onClick={guardarCambios}>
            Limpiar notas
          </Button>
        )}
      </Stack>
    </div>
  );
}
