const Cola = require('../src/Cola');

const cantidad = 100000;
const turnos = Array.from({ length: cantidad }, (_, i) => ({
  mascota: `Mascota ${i + 1}`,
  tutor: `Tutor ${i + 1}`,
  horaLlegada: '09:00',
  motivo: 'Consulta',
}));

function medir(callback) {
  const inicio = process.hrtime.bigint();
  callback();
  return Number(process.hrtime.bigint() - inicio) / 1e6;
}

const cola = new Cola();
const tiempoEncolarCola = medir(() => {
  for (const turno of turnos) cola.encolar(turno);
});
const tiempoDesencolarCola = medir(() => {
  while (!cola.estaVacia()) cola.desencolar();
});

const arreglo = [];
const tiempoEncolarArreglo = medir(() => {
  for (const turno of turnos) arreglo.push(turno);
});
const tiempoDesencolarArreglo = medir(() => {
  while (arreglo.length > 0) arreglo.shift();
});

console.log(`Turnos por implementación: ${cantidad}`);
console.log(`Cola enlazada - encolar: ${tiempoEncolarCola.toFixed(2)} ms`);
console.log(`Cola enlazada - desencolar: ${tiempoDesencolarCola.toFixed(2)} ms`);
console.log(`Arreglo - push: ${tiempoEncolarArreglo.toFixed(2)} ms`);
console.log(`Arreglo - shift: ${tiempoDesencolarArreglo.toFixed(2)} ms`);
