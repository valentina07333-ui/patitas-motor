const RegistroClinico = require('./RegistroClinico');

const registro = new RegistroClinico();

const atenciones = [
  {
    mascota: 'Lola (gata)',
    fecha: '02/02',
    motivo: 'Vacunación anual',
    veterinario: 'Dra. Ríos',
    costo: 85000,
  },
  {
    mascota: 'Lola (gata)',
    fecha: '15/03',
    motivo: 'Control de peso',
    veterinario: 'Dr. Gómez',
    costo: 40000,
  },
  {
    mascota: 'Lola (gata)',
    fecha: '20/05',
    motivo: 'Limpieza dental',
    veterinario: 'Dra. Ríos',
    costo: 150000,
  },
  {
    mascota: 'Toby (perro)',
    fecha: '10/01',
    motivo: 'Consulta por cojera',
    veterinario: 'Dr. Gómez',
    costo: 60000,
  },
  {
    mascota: 'Toby (perro)',
    fecha: '12/01',
    motivo: 'Radiografía de pata',
    veterinario: 'Dr. Gómez',
    costo: 120000,
  },
  {
    mascota: 'Toby (perro)',
    fecha: '05/04',
    motivo: 'Vacunación anual',
    veterinario: 'Dra. Ríos',
    costo: 85000,
  },
  {
    mascota: 'Mía (gata)',
    fecha: '18/02',
    motivo: 'Esterilización',
    veterinario: 'Dra. Ríos',
    costo: 280000,
  },
  {
    mascota: 'Mía (gata)',
    fecha: '25/02',
    motivo: 'Control posquirúrgico',
    veterinario: 'Dra. Ríos',
    costo: 0,
  },
];

for (const { mascota, ...atencion } of atenciones) {
  registro.registrarAtencion(mascota, atencion);
}

const formatoCosto = new Intl.NumberFormat('es-CO');

for (const [mascota, historial] of registro.historiales) {
  let costoTotal = 0;

  console.log(`\nHistorial de ${mascota}:`);
  historial.recorrer((atencion) => {
    console.log(
      `${atencion.fecha} | ${atencion.motivo} | ${atencion.veterinario} | $${formatoCosto.format(atencion.costo)}`,
    );
    costoTotal += atencion.costo;
  });

  const vacunacion = historial.buscar((atencion) =>
    atencion.motivo.toLowerCase().includes('vacunación'),
  );
  if (vacunacion === null) {
    console.log('Última vacunación: sin registro');
  } else {
    console.log(`Última vacunación: ${vacunacion.fecha} - ${vacunacion.motivo}`);
  }

  console.log(`Número de atenciones: ${historial.obtenerTamanio()}`);
  console.log(`Costo total: $${formatoCosto.format(costoTotal)}`);
}
