let Recepcion = require('./Recepcion');
let Editor = require('./Editor');

let llegadas = [
  { horaLlegada: '08:00', mascota: 'Toby', tipo: 'General', motivo: 'Control de vacunas' },
  { horaLlegada: '08:05', mascota: 'Max', tipo: 'General', motivo: 'Revisión de piel' },
  { horaLlegada: '08:10', mascota: 'Luna', tipo: 'Urgencia', motivo: 'Intoxicación' },
  { horaLlegada: '08:20', mascota: 'Simón', tipo: 'General', motivo: 'Corte de uñas' },
  { horaLlegada: '08:25', mascota: 'Kira', tipo: 'Urgencia', motivo: 'Herida en pata' },
  { horaLlegada: '08:40', mascota: 'Nala', tipo: 'General', motivo: 'Desparasitación' },
  { horaLlegada: '09:00', mascota: 'Rocky', tipo: 'Urgencia', motivo: 'Dificultad para respirar' },
];

function aMinutos(hora) {
  let partes = hora.split(':');
  let horas = Number(partes[0]);
  let minutos = Number(partes[1]);
  return horas * 60 + minutos;
}

function aHora(minutos) {
  let horas = Math.floor(minutos / 60);
  let resto = minutos % 60;

  if (horas < 10) {
    horas = '0' + horas;
  } else {
    horas = String(horas);
  }

  if (resto < 10) {
    resto = '0' + resto;
  } else {
    resto = String(resto);
  }

  let horaCompleta = horas + ':' + resto;
  return horaCompleta;
}

let recepcion = new Recepcion();
let editor = new Editor();
let indiceLlegada = 0;
let tiempo = aMinutos(llegadas[0].horaLlegada);
let finAtencion = null;
let turnoEnAtencion = null;
let inicioAtencion = null;
let reporteAtencion = [];
let esperas = {
  Urgencia: { total: 0, cantidad: 0 },
  General: { total: 0, cantidad: 0 },
};

while (
  indiceLlegada < llegadas.length ||
  !recepcion.urgencias.estaVacia() ||
  !recepcion.generales.estaVacia() ||
  finAtencion !== null
) {
  while (
    indiceLlegada < llegadas.length &&
    aMinutos(llegadas[indiceLlegada].horaLlegada) <= tiempo
  ) {
    recepcion.registrarLlegada(llegadas[indiceLlegada]);
    indiceLlegada++;
  }

  if (finAtencion !== null && tiempo >= finAtencion) {
    let atencion = {
      horaLlegada: turnoEnAtencion.horaLlegada,
      horaAtencion: aHora(inicioAtencion),
      tipo: turnoEnAtencion.tipo,
      motivo: turnoEnAtencion.motivo,
      esperaMinutos: inicioAtencion - aMinutos(turnoEnAtencion.horaLlegada),
    };

    let filaReporte = {
      mascota: turnoEnAtencion.mascota,
      tipo: turnoEnAtencion.tipo,
      motivo: turnoEnAtencion.motivo,
      horaLlegada: atencion.horaLlegada,
      horaAtencion: atencion.horaAtencion,
      esperaMinutos: atencion.esperaMinutos,
    };
    reporteAtencion.push(filaReporte);

    if (turnoEnAtencion.mascota === 'Toby') {
      console.log('Error: la atención de Toby se registró en Max.');
      editor.agregar('Max', atencion);
      editor.deshacer();
      console.log('Se deshizo el registro equivocado.');
      editor.agregar('Toby', atencion);
      console.log('La atención quedó registrada en Toby.');
    } else {
      editor.agregar(turnoEnAtencion.mascota, atencion);
    }
    finAtencion = null;
    turnoEnAtencion = null;
    inicioAtencion = null;
  }

  if (finAtencion === null) {
    let turno = recepcion.llamarSiguiente();
    if (turno !== null) {
      let llegada = aMinutos(turno.horaLlegada);
      let espera = tiempo - llegada;
      let grupo = 'General';
      if (turno.tipo.toLowerCase() === 'urgencia') {
        grupo = 'Urgencia';
      }

      esperas[grupo].total += espera;
      esperas[grupo].cantidad++;
      turnoEnAtencion = turno;
      inicioAtencion = tiempo;
      finAtencion = tiempo + 20;
    }
  }

  if (finAtencion !== null) {
    tiempo = finAtencion;
  } else if (indiceLlegada < llegadas.length) {
    tiempo = aMinutos(llegadas[indiceLlegada].horaLlegada);
  }
}

console.log('Reporte de atención:');
for (let indice = 0; indice < reporteAtencion.length; indice++) {
  let atencion = reporteAtencion[indice];
  let numero = indice + 1;
  let lineaReporte = numero + '. ';
  lineaReporte = lineaReporte + atencion.mascota + ' (' + atencion.tipo + ')';
  lineaReporte = lineaReporte + ' | llegó ' + atencion.horaLlegada;
  lineaReporte = lineaReporte + ' | atención ' + atencion.horaAtencion;
  lineaReporte = lineaReporte + ' | espera ' + atencion.esperaMinutos + ' min';
  lineaReporte = lineaReporte + ' | ' + atencion.motivo;
  console.log(lineaReporte);
}

let tipos = Object.keys(esperas);
for (let i = 0; i < tipos.length; i++) {
  let tipo = tipos[i];
  let datos = esperas[tipo];

  let promedio = 0;
  if (datos.cantidad > 0) {
    promedio = datos.total / datos.cantidad;
  }

  let nombre = 'consultas generales';
  if (tipo === 'Urgencia') {
    nombre = 'urgencias';
  }

  console.log('Espera promedio de ' + nombre + ': ' + promedio.toFixed(2) + ' minutos');
}

console.log('\nHistoriales actualizados:');
let mascotas = [];
editor.registro.historiales.forEach(function (historial, mascota) {
  mascotas.push(mascota);
});

for (let j = 0; j < mascotas.length; j++) {
  let mascota = mascotas[j];
  let historial = editor.registro.obtenerHistorial(mascota);
  console.log(mascota + ' (' + historial.obtenerTamanio() + ' atenciones):');
  historial.recorrer(function (atencion) {
    console.log(
      '  ' + atencion.horaAtencion + ' | ' + atencion.motivo + ' | ' +
      atencion.tipo + ' | espera ' + atencion.esperaMinutos + ' min',
    );
  });
}
