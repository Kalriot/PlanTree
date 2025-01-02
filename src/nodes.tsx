let firstNodes = [
  {
    id: 'c1',
    data: { label: 'CICLO 1' },
    ciclo: 1,
    position: { x: 0, y: 0 },
  },
  {
    id: 'INO101',
    data: { label: 'REDACCIÓN Y TÉCNICAS DE COMUNICACIÓN EFECTIVA I' },
    ciclo: 1,
    position: { x: 0, y: 0 },
  },
  {
    id: 'INO102',
    data: { label: 'MÉTODOS DE ESTUDIO UNIVERSITARIO' },
    ciclo: 1,
  },
  {
    id: 'INO103',
    data: { label: 'DESARROLLO PERSONAL Y LIDERAZGO' },
    ciclo: 1,
  },
  {
    id: 'INO104',
    data: { label: 'CÁLCULO I' },
    ciclo: 1,
  },
  {
    id: 'INO105',
    data: { label: 'BIOLOGÍA PARA CIENCIAS E INGENIERÍA' },
    ciclo: 1,
  },
  {
    id: 'INO106',
    data: { label: 'ÁLGEBRA Y GEOMETRÍA ANALÍTICA' },
    ciclo: 1,
  },
  {
    id: 'INO107',
    data: { label: 'MEDIO AMBIENTE Y DESARROLLO SOSTENIBLE' },
    ciclo: 1,
  },
  {
    id: 'c2',
    data: { label: 'CICLO 2' },
    ciclo: 2,
  },
  {
    id: 'INO201',
    data: { label: 'REDACCIÓN Y TÉCNICAS DE COMUNICACIÓN EFECTIVA II' },
    ciclo: 2,
  },
  {
    id: 'INO202',
    data: { label: 'INVESTIGACIÓN FORMATIVA' },
    ciclo: 2,
  },
  {
    id: 'INO203',
    data: { label: 'REALIDAD NACIONAL Y MUNDIAL' },
    ciclo: 2,
  },
  {
    id: 'INO204',
    data: { label: 'CÁLCULO II' },
    ciclo: 2,
  },
  {
    id: 'INO205',
    data: { label: 'FÍSICA I' },
    ciclo: 2,
  },
  {
    id: 'INO206',
    data: { label: 'QUÍMICA GENERAL' },
    ciclo: 2,
  },
  {
    id: 'INO207',
    data: { label: 'INTRODUCCIÓN A LAS CIENCIAS E INGENIERÍA' },
    ciclo: 2,
  },
  {
    id: 'c3',
    data: { label: 'CICLO 3' },
    ciclo: 3,
  },
  {
    id: '202W0301',
    data: { label: 'ALGORÍTMICA I' },
    ciclo: 3,
  },
  {
    id: '202W0302',
    data: { label: 'ESTADÍSTICA' },
    ciclo: 3,
  },
  {
    id: '202W0303',
    data: { label: 'FISICA ELÉCTRONICA' },
    ciclo: 3,
  },
  {
    id: '202W0304',
    data: { label: 'INGENIERÍA ECONÓMICA' },
    ciclo: 3,
  },
  {
    id: '202W0305',
    data: { label: 'INTRODUCCIÓN AL DESARROLLO DE SOFTWARE' },
    ciclo: 3,
  },
  {
    id: '202W0306',
    data: { label: 'MATEMÁTICA BÁSICA' },
    ciclo: 3,
  },
  {
    id: '202W0307',
    data: { label: 'ORGANIZACIÓN Y ADMINISTRACIÓN' },
    ciclo: 3,
  },
  {
    id: 'c4',
    data: { label: 'CICLO 4' },
    ciclo: 4,
  },
  {
    id: '202W0401',
    data: { label: 'ALGORÍTMICA II' },
    ciclo: 4,
  },
  {
    id: '202W0402',
    data: { label: 'CONTABILIDAD PARA LA GESTIÓN' },
    ciclo: 4,
  },
  {
    id: '202W0403',
    data: { label: 'INNOVACIÓN, TECNOLOGÍA Y EMPRENDIMIENTO' },
    ciclo: 4,
  },
  {
    id: '202W0404',
    data: { label: 'MATEMÁTICA DISCRETA ' },
    ciclo: 4,
  },
  {
    id: '202W0405',
    data: { label: 'PROBABILIDADES' },
    ciclo: 4,
  },
  {
    id: '202W0406',
    data: { label: 'PROCESOS DE SOFTWARE' },
    ciclo: 4,
  },
  {
    id: '202W0407',
    data: { label: 'SISTEMAS DIGITALES' },
    ciclo: 4,
  },
  {
    id: 'c5',
    data: { label: 'CICLO 5' },
    ciclo: 5,
  },
  {
    id: '202W0501',
    data: { label: 'ANÁLISIS Y DISEÑO DE ALGORITMOS' },
    ciclo: 5,
  },
  {
    id: '202W0502',
    data: { label: 'ARQUITECTURA DE COMPUTADORAS' },
    ciclo: 5,
  },
  {
    id: '202W0503',
    data: { label: 'CALIDAD DE SOFTWARE' },
    ciclo: 5,
  },
  {
    id: '202W0504',
    data: { label: 'COMPUTACIÓN VISUAL' },
    ciclo: 5,
  },
  {
    id: '202W0505',
    data: { label: 'ESTRUCTURA DE DATOS' },
    ciclo: 5,
  },
  {
    id: '202W0506',
    data: { label: 'ECONOMÍA PARA LA GESTIÓN' },
    ciclo: 5,
  },
  {
    id: '202W0507',
    data: { label: 'INGENIERÍA DE REQUISITOS ' },
    ciclo: 5,
  },
];

export let nodes = firstNodes.map((node) => ({
  ...node,
  position: { x: 0, y: 0 },
}));

const nodeStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',

  background: '#1e1e1e',
  border: '2px solid #555',
  borderRadius: 10,

  width: 200,
  height: 60,
};

let ciclo = 1;
let cont = 0;

nodes = nodes.map((node) => {
  if (ciclo !== node.ciclo) {
    ciclo = node.ciclo;
    cont = 0;
  }

  const xPos = ciclo * 400;
  const yPos = cont * 100;

  cont++;

  return {
    ...node,
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: xPos, y: yPos },
    style: { ...nodeStyle },
  };
});

console.log(nodes);
