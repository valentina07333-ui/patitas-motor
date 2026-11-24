const Cola = require('../src/Cola');

const cantidad = 100000;
const turnos = Array.from({ length: cantidad }, (_, i) => ({
  mascota: `Mascota ${i + 1}`,
  tutor: `Tutor ${i + 1}`,
  horaLlegada: '09:00',
  motivo: 'Consulta',
}));

const cola = new Cola();
console.time('Cola enlazada - encolar');
for (const turno of turnos) cola.encolar(turno);
console.timeEnd('Cola enlazada - encolar');

console.time('Cola enlazada - desencolar');
while (!cola.estaVacia()) cola.desencolar();
console.timeEnd('Cola enlazada - desencolar');

const arreglo = [];
console.time('Arreglo - push');
for (const turno of turnos) arreglo.push(turno);
console.timeEnd('Arreglo - push');

console.time('Arreglo - shift');
while (arreglo.length > 0) arreglo.shift();
console.timeEnd('Arreglo - shift');
