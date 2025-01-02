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

let nodes = firstNodes.map((node) => ({
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

let edges = [
  {
    id: 'INO101-INO201',
    source: 'INO101',
    target: 'INO201',
  },
  {
    id: 'INO104-INO204',
    source: 'INO104',
    target: 'INO204',
  },
  {
    id: '202W0301-202W0401',
    source: '202W0301',
    target: '202W0401',
  },
  {
    id: '202W0307-202W0402',
    source: '202W0307',
    target: '202W0402',
  },
  {
    id: '202W0304-202W0403',
    source: '202W0304',
    target: '202W0403',
  },
  {
    id: '202W0306-202W0404',
    source: '202W0306',
    target: '202W0404',
  },
  {
    id: '202W0302-202W0405',
    source: '202W0302',
    target: '202W0405',
  },
  {
    id: '202W0305-202W0406',
    source: '202W0305',
    target: '202W0406',
  },
  {
    id: '202W0304-202W0406',
    source: '202W0304',
    target: '202W0406',
  },
  {
    id: '202W0303-202W0407',
    source: '202W0303',
    target: '202W0407',
  },
  {
    id: '202W0401-202W0501',
    source: '202W0401',
    target: '202W0501',
  },
  {
    id: '202W0405-202W0501',
    source: '202W0405',
    target: '202W0501',
  },
  {
    id: '202W0407-202W0502',
    source: '202W0407',
    target: '202W0502',
  },
  {
    id: '202W0406-202W0503',
    source: '202W0406',
    target: '202W0503',
  },
  {
    id: '202W0404-202W0504',
    source: '202W0404',
    target: '202W0504',
  },
  {
    id: '202W0401-202W0505',
    source: '202W0401',
    target: '202W0505',
  },
  {
    id: '202W0402-202W0506',
    source: '202W0402',
    target: '202W0506',
  },
  {
    id: '202W0406-202W0507',
    source: '202W0406',
    target: '202W0507',
  },
  {
    id: '202W0503-202W0601',
    source: '202W0503',
    target: '202W0601',
  },
  {
    id: '202W0505-202W0602',
    source: '202W0505',
    target: '202W0602',
  },
  {
    id: '202W0507-202W0603',
    source: '202W0507',
    target: '202W0603',
  },
  {
    id: '202W0505-202W0603',
    source: '202W0505',
    target: '202W0603',
  },
  {
    id: '202W0506-202W0604',
    source: '202W0506',
    target: '202W0604',
  },
  {
    id: '202W0403-202W0604',
    source: '202W0403',
    target: '202W0604',
  },
  {
    id: '202W0406-202W0605',
    source: '202W0406',
    target: '202W0605',
  },
  {
    id: '202W0504-202W0606',
    source: '202W0504',
    target: '202W0606',
  },
  {
    id: '202W0502-202W0607',
    source: '202W0502',
    target: '202W0607',
  },
  {
    id: '202W0602-202W0701',
    source: '202W0602',
    target: '202W0701',
  },
  {
    id: '202W0603-202W0701',
    source: '202W0603',
    target: '202W0701',
  },
  {
    id: '202W0601-202W0701',
    source: '202W0601',
    target: '202W0701',
  },
  {
    id: '202W0602-202W0702',
    source: '202W0602',
    target: '202W0702',
  },
  {
    id: '202W0603-202W0703',
    source: '202W0603',
    target: '202W0703',
  },
  {
    id: '202W0606-202W0703',
    source: '202W0606',
    target: '202W0703',
  },
  {
    id: '202W0604-202W0704',
    source: '202W0604',
    target: '202W0704',
  },
  {
    id: '202W0606-202W0705',
    source: '202W0606',
    target: '202W0705',
  },
  {
    id: '202W0503-202W0706',
    source: '202W0503',
    target: '202W0706',
  },
  {
    id: '202W0605-202W0706',
    source: '202W0605',
    target: '202W0706',
  },
  {
    id: '202W0607-202W0707',
    source: '202W0607',
    target: '202W0707',
  },
  {
    id: '202W0707-202W0801',
    source: '202W0707',
    target: '202W0801',
  },
  {
    id: '202W0501-202W0802',
    source: '202W0501',
    target: '202W0802',
  },
  {
    id: '202W0702-202W0802',
    source: '202W0702',
    target: '202W0802',
  },
  {
    id: '202W0701-202W0803',
    source: '202W0701',
    target: '202W0803',
  },
  {
    id: '202W0705-202W0803',
    source: '202W0705',
    target: '202W0803',
  },
  {
    id: '202W0702-202W0804',
    source: '202W0702',
    target: '202W0804',
  },
  {
    id: '202W0607-202W0805',
    source: '202W0607',
    target: '202W0805',
  },
  {
    id: '202W0601-202W0806',
    source: '202W0601',
    target: '202W0806',
  },
  {
    id: '202W0707-202W0806',
    source: '202W0707',
    target: '202W0806',
  },
  {
    id: '202W0701-202W0807',
    source: '202W0701',
    target: '202W0807',
  },
  {
    id: '202W0702-202W0807',
    source: '202W0702',
    target: '202W0807',
  },
  {
    id: '202W0703-202W0807',
    source: '202W0703',
    target: '202W0807',
  },
  {
    id: '202W0707-202W0807',
    source: '202W0707',
    target: '202W0807',
  },
  {
    id: '202W0706-202W0808',
    source: '202W0706',
    target: '202W0808',
  },
  {
    id: '202W0803-202W0901',
    source: '202W0803',
    target: '202W0901',
  },
  {
    id: '202W0806-202W0902',
    source: '202W0806',
    target: '202W0902',
  },
  {
    id: '202W0704-202W0903',
    source: '202W0704',
    target: '202W0903',
  },
  {
    id: '202W0807-202W0904',
    source: '202W0807',
    target: '202W0904',
  },
  {
    id: '202W0704-202W0905',
    source: '202W0704',
    target: '202W0905',
  },
  {
    id: '202W0801-202W0906',
    source: '202W0801',
    target: '202W0906',
  },
  {
    id: '202W0807-202W0907',
    source: '202W0807',
    target: '202W0907',
  },
  {
    id: '202W0808-202W0907',
    source: '202W0808',
    target: '202W0907',
  },
  {
    id: '202W0705-202W0908',
    source: '202W0705',
    target: '202W0908',
  },
  {
    id: '202W0802-202W1001',
    source: '202W0802',
    target: '202W1001',
  },
  {
    id: '202W0908-202W1001',
    source: '202W0908',
    target: '202W1001',
  },
  {
    id: '202W0901-202W1002',
    source: '202W0901',
    target: '202W1002',
  },
  {
    id: '202W0907-202W1003',
    source: '202W0907',
    target: '202W1003',
  },
  {
    id: '202W0907-202W1004',
    source: '202W0907',
    target: '202W1004',
  },
  {
    id: '202W0907-202W1005',
    source: '202W0907',
    target: '202W1005',
  },
  {
    id: '202W0903-202W1006',
    source: '202W0903',
    target: '202W1006',
  },
];

const colorNames = [
  '#d51f68',
  '#f96708',
  '#fabd40',
  '#2ddd6a',
  '#6ad7d6',
  '#2bb5f3',
  '#ba29e0',
];

let edgeColors: Record<string, string> = {};
let colorIndex = 0;

edges = edges.map((edge) => {
  let color: string | null = null;

  for (const [key, value] of Object.entries(edgeColors)) {
    if (key === edge.source) {
      color = value;
    }
  }

  if (!color) {
    color = colorNames[colorIndex % colorNames.length];
    edgeColors[edge.source] = color;
    colorIndex++;
  }

  return {
    ...edge,
    style: { stroke: color, strokeWidth: 2 },
  };
});

console.log('edges', edges);

export { nodes, edges };
