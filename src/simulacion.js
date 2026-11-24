const Recepcion = require('./Recepcion');

const llegadas = [
  { horaLlegada: '08:00', mascota: 'Toby', tipo: 'General', motivo: 'Control de vacunas' },
  { horaLlegada: '08:05', mascota: 'Max', tipo: 'General', motivo: 'Revisión de piel' },
  { horaLlegada: '08:10', mascota: 'Luna', tipo: 'Urgencia', motivo: 'Intoxicación' },
  { horaLlegada: '08:20', mascota: 'Simón', tipo: 'General', motivo: 'Corte de uñas' },
  { horaLlegada: '08:25', mascota: 'Kira', tipo: 'Urgencia', motivo: 'Herida en pata' },
  { horaLlegada: '08:40', mascota: 'Nala', tipo: 'General', motivo: 'Desparasitación' },
  { horaLlegada: '09:00', mascota: 'Rocky', tipo: 'Urgencia', motivo: 'Dificultad para respirar' },
];

function aMinutos(hora) {
  const [horas, minutos] = hora.split(':').map(Number);
  return horas * 60 + minutos;
}

function aHora(minutos) {
  const horas = String(Math.floor(minutos / 60)).padStart(2, '0');
  const resto = String(minutos % 60).padStart(2, '0');
  return `${horas}:${resto}`;
}

const recepcion = new Recepcion();
let indiceLlegada = 0;
let tiempo = aMinutos(llegadas[0].horaLlegada);
let finAtencion = null;
const esperas = {
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
    finAtencion = null;
  }

  if (finAtencion === null) {
    const turno = recepcion.llamarSiguiente();
    if (turno !== null) {
      const llegada = aMinutos(turno.horaLlegada);
      const espera = tiempo - llegada;
      const grupo = turno.tipo.toLowerCase() === 'urgencia' ? 'Urgencia' : 'General';
      esperas[grupo].total += espera;
      esperas[grupo].cantidad++;
      console.log(
        `${turno.mascota} (${turno.tipo}) | llegó ${turno.horaLlegada} | atención ${aHora(tiempo)} | espera ${espera} min | ${turno.motivo}`,
      );
      finAtencion = tiempo + 20;
    }
  }

  tiempo++;
}

for (const [tipo, datos] of Object.entries(esperas)) {
  const promedio = datos.cantidad === 0 ? 0 : datos.total / datos.cantidad;
  const nombre = tipo === 'Urgencia' ? 'urgencias' : 'consultas generales';
  console.log(`Espera promedio de ${nombre}: ${promedio.toFixed(2)} minutos`);
}
