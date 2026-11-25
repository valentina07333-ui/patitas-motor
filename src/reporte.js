let RegistroClinico = require('./RegistroClinico');

let registro = new RegistroClinico();

let atenciones = [
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

for (let i = 0; i < atenciones.length; i++) {
  let dato = atenciones[i];
  let atencion = {
    fecha: dato.fecha,
    motivo: dato.motivo,
    veterinario: dato.veterinario,
    costo: dato.costo,
  };

  registro.registrarAtencion(dato.mascota, atencion);
}

let formatoCosto = new Intl.NumberFormat('es-CO');

let mascotas = [];
registro.historiales.forEach(function (historial, mascota) {
  mascotas.push(mascota);
});

for (let j = 0; j < mascotas.length; j++) {
  let mascota = mascotas[j];
  let historial = registro.obtenerHistorial(mascota);
  let costoTotal = 0;

  console.log('\nHistorial de ' + mascota + ':');
  historial.recorrer(function (atencion) {
    console.log(
      atencion.fecha + ' | ' + atencion.motivo + ' | ' + atencion.veterinario +
      ' | $' + formatoCosto.format(atencion.costo),
    );
    costoTotal += atencion.costo;
  });

  let vacunacion = historial.buscar(function (atencion) {
    return atencion.motivo.toLowerCase().indexOf('vacunación') !== -1;
  });
  if (vacunacion === null) {
    console.log('Última vacunación: sin registro');
  } else {
    console.log('Última vacunación: ' + vacunacion.fecha + ' - ' + vacunacion.motivo);
  }

  console.log('Número de atenciones: ' + historial.obtenerTamanio());
  console.log('Costo total: $' + formatoCosto.format(costoTotal));
}
