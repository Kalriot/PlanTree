const firstNodes = [
  {
    id: 'INO101',
    data: { label: 'REDACCIÓN Y TÉCNICAS DE COMUNICACIÓN EFECTIVA I' },
    ciclo: 1,
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

  {
    id: '202W0601',
    data: { label: 'ASEGURAMIENTO DE LA CALIDAD DEL SOFTWARE' },
    ciclo: 6,
  },
  {
    id: '202W0602',
    data: { label: 'BASE DE DATOS I' },
    ciclo: 6,
  },
  {
    id: '202W0603',
    data: { label: 'DISEÑO DE SOFTWARE' },
    ciclo: 6,
  },
  {
    id: '202W0604',
    data: { label: 'FORMACIÓN DE EMPRESAS DE SOFTWARE' },
    ciclo: 6,
  },
  {
    id: '202W0605',
    data: { label: 'GESTIÓN DE LA CONFIGURACIÓN DEL SOFTWARE' },
    ciclo: 6,
  },
  {
    id: '202W0606',
    data: { label: 'INTERACCIÓN HOMBRE COMPUTADOR' },
    ciclo: 6,
  },
  {
    id: '202W0607',
    data: { label: 'SISTEMAS OPERATIVOS ' },
    ciclo: 6,
  },

  {
    id: '202W0701',
    data: { label: 'ARQUITECTURA DE SOFTWARE' },
    ciclo: 7,
  },
  {
    id: '202W0702',
    data: { label: 'BASE DE DATOS II' },
    ciclo: 7,
  },
  {
    id: '202W0703',
    data: { label: 'EXPERIENCIA DE USUARIO Y USABILIDAD' },
    ciclo: 7,
  },
  {
    id: '202W0704',
    data: { label: 'GESTIÓN DE PROYECTO DE SOFTWARE' },
    ciclo: 7,
  },
  {
    id: '202W0705',
    data: { label: 'INTELIGENCIA ARTIFICIAL' },
    ciclo: 7,
  },
  {
    id: '202W0706',
    data: { label: 'MÉTODOS FORMALES PARA PRUEBAS' },
    ciclo: 7,
  },
  {
    id: '202W0707',
    data: { label: 'REDES Y TRANSMISIÓN DE DATOS' },
    ciclo: 7,
  },

  {
    id: '202W0801',
    data: { label: 'AUTOMATIZACIÓN Y CONTROL DE SOFTWARE' },
    ciclo: 8,
  },
  {
    id: '202W0802',
    data: { label: 'INTELIGENCIA DE NEGOCIOS' },
    ciclo: 8,
  },
  {
    id: '202W0803',
    data: { label: 'METODOLOGÍA DE LA INVESTIGACIÓN' },
    ciclo: 8,
  },
  {
    id: '202W0804',
    data: { label: 'MINERÍA DE DATOS' },
    ciclo: 8,
  },
  {
    id: '202W0805',
    data: { label: 'PROGRAMACIÓN CONCURRENTE Y PARALELA' },
    ciclo: 8,
  },
  {
    id: '202W0806',
    data: { label: 'SEGURIDAD DEL SOFTWARE' },
    ciclo: 8,
  },
  {
    id: '202W0807',
    data: { label: 'TALLER DE CONSTRUCCIÓN DE SOFTWARE WEB' },
    ciclo: 8,
  },
  {
    id: '202W0808',
    data: { label: 'VERIFICACIÓN Y VALIDACIÓN DE SOFTWARE' },
    ciclo: 8,
  },

  {
    id: '202W0901',
    data: { label: 'DESARROLLO DE TESIS I' },
    ciclo: 9,
  },
  {
    id: '202W0902',
    data: { label: 'GARANTÍA DE SOFTWARE' },
    ciclo: 9,
  },
  {
    id: '202W0903',
    data: { label: 'GERENCIA DE TECNOLOGÍA DE LA INFORMACIÓN' },
    ciclo: 9,
  },
  {
    id: '202W0904',
    data: { label: 'GESTIÓN DE MANTENIMIENTO DEL SOFTWARE' },
    ciclo: 9,
  },
  {
    id: '202W0905',
    data: { label: 'GESTIÓN DE RIESGO DEL SOFTWARE' },
    ciclo: 9,
  },
  {
    id: '202W0906',
    data: { label: 'INTERNET DE LAS COSAS' },
    ciclo: 9,
  },
  {
    id: '202W0907',
    data: { label: 'TALLER DE CONSTRUCCIÓN DE SOFTWARE MÓVIL' },
    ciclo: 9,
  },
  {
    id: '202W0908',
    data: { label: 'SOFTWARE INTELIGENTE' },
    ciclo: 9,
  },

  {
    id: '202W1001',
    data: { label: 'ANALÍTICA DE DATOS' },
    ciclo: 10,
  },
  {
    id: '202W1002',
    data: { label: 'DESARROLLO DE TESIS II' },
    ciclo: 10,
  },
  {
    id: '202W1003',
    data: { label: 'PRÁCTICA PRE PROFESIONAL' },
    ciclo: 10,
  },
  {
    id: '202W1004',
    data: { label: 'TALLER DE APLICACIONES SOCIALES' },
    ciclo: 10,
  },
  {
    id: '202W1005',
    data: { label: 'TENDENCIAS DE ARQUITECTURA DE SOFTWARE' },
    ciclo: 10,
  },
  {
    id: '202W1006',
    data: { label: 'TENDENCIAS EN INGENIERÍA DE SOFTWARE Y GESTIÓN' },
    ciclo: 10,
  },
];

export let initialNodes = firstNodes.map((node) => ({
  ...node,
  position: { x: 0, y: 0 },
}));

let ciclo = 1;
let cont = 1;

const horizontalSpace = 400;
const verticalSpace = 150;

initialNodes = initialNodes.map((node) => {
  if (ciclo !== node.ciclo) {
    ciclo = node.ciclo;
    cont = 1;
  }

  const xPos = ciclo * horizontalSpace;
  const yPos = cont * verticalSpace;

  cont++;

  return {
    ...node,
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: xPos, y: yPos },
    className: 'node-base node-standard',
  };
});

for (let i = 1; i <= 10; i++) {
  initialNodes.push({
    id: `nodoCiclo${i}`,
    data: { label: `CICLO ${i}` },
    ciclo: i,
    credito: 0,
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: i * horizontalSpace, y: 0 },
    className: 'node-base node-standard',
  });
}

// console.log(nodes);
