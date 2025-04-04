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
  Tooltip,
} from '@mantine/core';
import { IconCheck,IconAlertCircle } from '@tabler/icons-react';

import { useGlobalStore } from '../../../store/useGlobalStore';
interface Parcial {
  nota: number | ''; 
  porcentaje: number | ''; 
}
interface NotasPorCurso {
  [key: string]: {
    estado: 'ninguno' | 'llevado' | 'en curso';
    nota?: number;
    parciales?: Array<{ nota: number | ''; porcentaje: number | '' }>;
  };
}
export default function Aside() {
  const selectedNodeData = useGlobalStore((state) => state.getNodeData());
  const cursoId = selectedNodeData?.id;
  const nodes = useGlobalStore((state) => state.nodes);
  
  const [estado, setEstado] = useState<'ninguno' | 'llevado' | 'en curso'>('ninguno');
  const [nota, setNota] = useState<number | ''>(''); 
  const [modoEdicion, setModoEdicion] = useState(false);
  const [notaFinalEstimado, setNotaFinalEstimado] = useState<number>(0);
  const [parciales, setParciales] = useState<Array<{ nota: number | ''; porcentaje: number | '' }>>([]);
  const [alerta, setAlerta] = useState(false);

  const setNotasPorCursoGlobal = useGlobalStore((state) => state.setNotasPorCurso);
  const notasPorCursoGlobal = useGlobalStore((state) => state.notasPorCurso);



  useEffect(() => {
    if (!cursoId) return;

    const datosCurso = notasPorCursoGlobal[cursoId]; // Cargar desde el estado global
    if (datosCurso) {
      setEstado(datosCurso.estado);  
      setNota(datosCurso.nota ?? '');
      setParciales(datosCurso.parciales ?? [{ nota: '', porcentaje: '' }]);
    } else {
      setEstado('ninguno');
      setNota('');
      setParciales([{ nota: '', porcentaje: '' }]);
    }
  }, [cursoId, notasPorCursoGlobal]);
  
  

  const guardarCambios = () => {
    let notaCalculada = undefined;

    if (estado === 'en curso' && Array.isArray(parciales)) {
      const { suma, totalPeso } = parciales.reduce(
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
      if (totalPeso > 0) {
        notaCalculada = parseFloat((suma / totalPeso).toFixed(2));
      }
    }

    const nuevaNota = {
      estado,
      nota:
        estado === 'llevado'
          ? typeof nota === 'number'
            ? nota
            : 0
          : estado === 'en curso'
          ? notaCalculada
          : undefined,
      parciales: estado === 'en curso' ? parciales : undefined,
    };

    if (estado === 'ninguno') {
      nuevaNota.nota = undefined;
      nuevaNota.parciales = undefined;
    }

    const actualizado: NotasPorCurso = {
      ...notasPorCursoGlobal, 
      [cursoId]: nuevaNota, 
    };

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
          const peso = Number(parcial.porcentaje);
          acc.suma += Number(parcial.nota) * peso;
          acc.totalPeso += peso;
        }
        return acc;
      },
      { suma: 0, totalPeso: 0 }
    );
    setNotaFinalEstimado(
      total.totalPeso > 0 ? parseFloat((total.suma / 100).toFixed(2)) : 0
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
    const ciclosMap = new Map<
      string | number,
      { suma: number; cantidad: number; creditos: number; enCurso: number }
    >();

    let totalNotas = 0;
    let totalCreditos = 0;
    let totalCreditosLlevados = 0;

    const resumenCursos = nodes
  .filter((node) => !node.id.includes('nodoCiclo')) // Filtramos los nodos que no contienen 'nodoCiclo'
  .map((node) => {
    const data = notasPorCursoGlobal[node.id]; // Accedemos a las notas del curso desde el estado global
    const creditos = Number(node.creditos) || 0; // Aseguramos que los créditos sean un número válido
    const ciclo = node.ciclo || 'Sin ciclo'; // Asignamos 'Sin ciclo' si no tiene valor

    let nota: number | null = null; // Inicializamos la nota como null
    const estado = data?.estado; // Obtenemos el estado del curso

    // Comprobamos si el estado es 'llevado' y si hay una nota válida
    if (estado === 'llevado' && typeof data?.nota === 'number') {
      nota = data.nota; // Si está 'llevado', asignamos la nota directamente
    } 
    // Si el estado es 'en curso', calculamos la nota ponderada a partir de los parciales
    else if (estado === 'en curso' && Array.isArray(data?.parciales)) {
      let parcialSuma = 0;
      let totalPeso = 0;

      // Sumamos las notas ponderadas de los parciales
      data.parciales.forEach((p: Parcial) => {
        const notaValida = typeof p.nota === 'number' ? p.nota : 0; // Si nota es una cadena vacía, la convertimos a 0
        const porcentajeValido = typeof p.porcentaje === 'number' ? p.porcentaje : 0; // Hacemos lo mismo con el porcentaje
        
        parcialSuma += notaValida * (porcentajeValido / 100); // Multiplicamos por el porcentaje convertido a decimal
        totalPeso += porcentajeValido; // Acumulamos el peso total de los parciales
      });

      // Si se han sumado parciales válidos, calculamos el promedio ponderado
      if (totalPeso > 0) {
        nota = parseFloat((parcialSuma).toFixed(2)); // Guardamos la nota calculada
      }
    }

    // Retornamos un objeto con los datos del ciclo, nota, créditos y estado
    return {
      ciclo,
      nota,
      creditos,
      estado,
    };
  });


    resumenCursos.forEach(({ ciclo, nota, creditos, estado }) => {
      if (nota == null || creditos === 0) return;

      if (!ciclosMap.has(ciclo)) {
        ciclosMap.set(ciclo, { suma: 0, cantidad: 0, creditos: 0, enCurso: 0 });
      }

      const obj = ciclosMap.get(ciclo)!;
      obj.suma += nota;
      obj.cantidad += 1;
      obj.creditos += creditos;

      totalNotas += nota * creditos;
      totalCreditos += creditos;

      if (estado === 'llevado') {
        totalCreditosLlevados += creditos;
      }
      if (estado === 'en curso') {
        obj.enCurso += 1;
        totalCreditosLlevados += creditos;

      }
    });

    const rows = Array.from(ciclosMap.entries())
      .filter(([_, { cantidad }]) => cantidad > 0)
      .map(([ciclo, { suma, cantidad, creditos, enCurso }]) => (
        <tr key={ciclo}>
          <td>
            {ciclo}
            {enCurso > 0 && (
              <Tooltip label={`${enCurso} curso(s) en curso`} color="yellow">
                <IconAlertCircle size={16} style={{ marginLeft: 6, color: '#f59e0b' }} />
              </Tooltip>
            )}
          </td>
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
          <Text fw={600}>
            Promedio General:{' '}
            {totalCreditos > 0 ? (
              <>
                {(totalNotas / totalCreditos).toFixed(2)} (
                {totalNotas.toFixed(2)} entre {totalCreditos})
              </>
            ) : (
              'Sin notas'
            )}
          </Text>
          <Text fw={600}>
            Créditos llevados:{' '}
            {totalCreditosLlevados > 0 ? (
              <>
                {totalCreditosLlevados} ({totalCreditosLlevados} créditos llevados)
              </>
            ) : (
              'Sin créditos'
            )}
          </Text>
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
