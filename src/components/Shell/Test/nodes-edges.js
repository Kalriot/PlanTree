export function transformData(data) {
  const nodes = [];
  const nodeIds = [];
  const edges = [];

  // let nSemester = null;

  // let semesterNode = {};
  let courseNode = {};
  let courseEdge = {};

  data.forEach((course) => {
    // ignorar los cursos no obligatorios
    if (course.tipoAsignatura === 'E') return;

    // // añadir nodo del semestre
    // if (nSemester !== course.ciclo) {
    //   nSemester = course.ciclo;

    //   semesterNode = {
    //     id: 'c' + nSemester,
    //     text: 'CICLO ' + nSemester,
    //     layoutOptions: {
    //       'partitioning.partition': nSemester,
    //     },
    //   };

    //   nodes.push(semesterNode);
    // }

    // añadir los demas nodos de cursos
    const nodeExist = nodeIds.some((nodeId) => nodeId === course.codAsignatura);

    if (!nodeExist) {
      courseNode = {
        id: course.codAsignatura,
        data: { label: course.desAsignatura },
        ciclo: course.ciclo,
        creditos: course.creditos,
      };

      nodes.push(courseNode);
      nodeIds.unshift(course.codAsignatura);
    }

    // añadir los edges
    if (course.codAsignaturaPre !== 'NR') {
      courseEdge = {
        id: course.codAsignaturaPre + '-' + course.codAsignatura,
        source: course.codAsignaturaPre,
        target: course.codAsignatura,
      };
      edges.push(courseEdge);
    }
  });

  // Asignar posiciones y valores básicos
  let ciclo = 1;
  let cont = 1;

  const horizontalSpace = 400;
  const verticalSpace = 150;

  const positionedNodes = nodes.map((node) => {
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
    positionedNodes.push({
      id: `nodoCiclo${i}`,
      data: { label: `CICLO ${i}` },
      ciclo: i,
      credito: 0,
      sourcePosition: 'right',
      targetPosition: 'left',
      position: { x: i * horizontalSpace, y: 0 },
      className: 'node-base node-standard',
      selectable: false,
    });
  }

  return { nodes: positionedNodes, edges };
}
